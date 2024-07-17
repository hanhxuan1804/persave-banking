'use server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ID, Query } from 'node-appwrite';
import {
  CountryCode,
  ProcessorTokenCreateRequest,
  ProcessorTokenCreateRequestProcessorEnum,
  Products,
} from 'plaid';
import z from 'zod';

import {
  addFundingSource,
  createDwollaCustomer,
} from '@/lib/actions/dwolla.actions';
import {
  createAdminClient,
  createDatabaseClient,
  createSessionClient,
} from '@/lib/server/appwrite';
import { plaidClient } from '@/lib/server/plaid';
import { encryptId, extractCustomerIdFromUrl } from '@/lib/utils';
import { ActionsResponse } from '@/types';
import TBank from '@/types/bank';
import { signInFormSchema, signUpFormSchema } from '@/types/schema';
import { TUser } from '@/types/user';

export async function SignUp(data: z.infer<typeof signUpFormSchema>) {
  try {
    //create user
    const user = await createUser(data);
    if (!user) {
      throw new Error('Error creating user');
    }
    //auth
    const email = data.email;
    const password = data.password;
    const name = data.firstName + ' ' + data.lastName;

    const { account } = await createAdminClient();

    await account.create(ID.unique(), email, password, name);
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set('appwrite-session', session.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });
    return new ActionsResponse('success', 'Account created successfully').get();
  } catch (error) {
    const err = error as Error;
    return new ActionsResponse('error', err.message).get();
  }
}

export async function SignIn(data: z.infer<typeof signInFormSchema>) {
  try {
    //check user
    const user = await getUserByEmail(data.email);
    if (!user || user.password !== data.password) {
      return new ActionsResponse('error', 'Invalid email or password').get();
    }
    //auth
    const email = data.email;
    const password = data.password;

    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);
    cookies().set('appwrite-session', session.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });

    return new ActionsResponse('success', 'Signed in successfully').get();
  } catch (error) {
    return new ActionsResponse('error', 'Invalid email or password').get();
  }
}

export async function SignOut() {
  const { account } = await createSessionClient();

  cookies().delete('appwrite-session');
  await account.deleteSession('current');
  redirect('/signin');
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const data = await account.get();
    const user = await getUserByEmail(data.email);
    if (!user) {
      return null;
    }
    const AppUser: TUser = {
      $id: data.$id,
      userId: user.$id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      dwollaCustomerUrl: user.dwollaCustomerUrl,
      dwollaCustomerId: user.dwollaCustomerId,
      name: user.firstName + ' ' + user.lastName,
      address: user.address,
      dob: user.dob,
      gender: user.gender,
      city: user.city,
      state: user.state,
      postalCode: user.postalCode,
      ssn: user.ssn,
      image: '/avatar.webp',
    };
    return JSON.stringify(AppUser);
  } catch (error) {
    return null;
  }
}

export async function getUserByEmail(email: string) {
  try {
    const DB = await createDatabaseClient();
    const findStatus = await DB.databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
      [Query.equal('email', email)]
    );
    if (findStatus.total === 0) {
      return null;
    }
    return findStatus.documents[0];
  } catch (error) {
    return null;
  }
}

export async function createUser(data: z.infer<typeof signUpFormSchema>) {
  try {
    const dwollaCustomerUrl = await createDwollaCustomer({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      address1: data.address,
      dateOfBirth: data.dob.toISOString(),
      city: data.city,
      state: data.state,
      postalCode: data.postalCode,
      ssn: data.ssn,
      type: 'personal',
    });
    if (!dwollaCustomerUrl) {
      throw new Error('Error creating Dwolla customer');
    }
    const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);
    const DB = await createDatabaseClient();
    const user = await DB.databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
      ID.unique(),
      {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        dob: data.dob,
        address: data.address,
        gender: data.gender,
        password: data.password,
        dwollaCustomerUrl,
        dwollaCustomerId,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        ssn: data.ssn,
      }
    );
    return user;
  } catch (error) {
    return null;
  }
}

export async function createLinkToken(user: TUser) {
  try {
    const tokenParams = {
      user: {
        client_user_id: user.$id,
      },
      client_name: user.firstName + ' ' + user.lastName,
      products: ['auth'] as Products[],
      language: 'en',
      country_codes: ['US'] as CountryCode[],
    };
    const response = await plaidClient.linkTokenCreate(tokenParams);
    return new ActionsResponse('success', 'Token created successfully', {
      linkToken: response.data.link_token,
    }).get();
  } catch (error) {
    return new ActionsResponse('error', 'Error creating token').get();
  }
}
export async function createBankAccount(data: {
  userId: string;
  bankId: string;
  accountId: string;
  accessToken: string;
  fundingSourceUrl: string;
  shareableId: string;
}) {
  try {
    const DB = await createDatabaseClient();
    await DB.databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_BANK_COLLECTION_ID!,
      ID.unique(),
      {
        userId: data.userId,
        bankId: data.bankId,
        accountId: data.accountId,
        accessToken: data.accessToken,
        fundingSourceUrl: data.fundingSourceUrl,
        shareableId: data.shareableId,
      }
    );
    return true;
  } catch (error) {
    return false;
  }
}

export async function exchangePublicToken(data: {
  user: TUser;
  publicToken: string;
}) {
  try {
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: data.publicToken,
    });
    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;
    //Get account data from plaid using accessToken
    const accountResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });
    const accountsData = accountResponse.data.accounts;
    if (!accountsData || accountsData.length === 0) {
      throw new Error('No accounts found');
    }
    await Promise.all(
      accountsData.map(async (accountData) => {
        const bankExists = await checkBankExists(accountData.account_id);
        if (bankExists) {
          return;
        }
        //Create a processor token fow Dwolla using accessToken and accountData
        const request: ProcessorTokenCreateRequest = {
          client_id: process.env.NEXT_PUBLIC_PLAID_CLIENT_ID!,
          secret: process.env.NEXT_PUBLIC_PLAID_SECRET!,
          processor: 'dwolla' as ProcessorTokenCreateRequestProcessorEnum,
          access_token: accessToken,
          account_id: accountData.account_id,
        };
        const processorTokenResponse =
          await plaidClient.processorTokenCreate(request);
        const processorToken = processorTokenResponse.data.processor_token;
        const fundingSourceUrl = await addFundingSource({
          dwollaCustomerId: data.user.dwollaCustomerId,
          processorToken,
          bankName: accountData.name,
        });

        if (fundingSourceUrl) {
          //Create bank account using fundingSourceUrl
          await createBankAccount({
            userId: data.user.userId,
            bankId: itemId,
            accountId: accountData.account_id,
            accessToken,
            fundingSourceUrl,
            shareableId: encryptId(accountData.account_id),
          });
        }
      })
    );
    console.log('Transactions updated');
    //Revalidate the path to reflect the changes
    revalidatePath('/dashboard');

    return new ActionsResponse(
      'success',
      'Account connected successfully'
    ).get();
  } catch (error) {
    const err = error as Error;
    const message = err.message || 'Error exchanging public token';
    return new ActionsResponse('error', message).get();
  }
}

export const checkBankExists = async (accountId: string) => {
  const DB = await createDatabaseClient();
  const findStatus = await DB.databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_BANK_COLLECTION_ID!,
    [Query.equal('accountId', accountId)]
  );
  if (findStatus.total === 0) {
    return false;
  }
  return true;
};

export async function getBankAccounts(userId: string) {
  try {
    const DB = await createDatabaseClient();
    const findStatus = await DB.databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_BANK_COLLECTION_ID!,
      [Query.equal('userId', userId)]
    );
    if (findStatus.total === 0) {
      const empty: TBank[] = [];
      return empty;
    }
    const result: TBank[] = findStatus.documents.map((doc) => {
      return {
        $id: doc.$id,
        bankId: doc.bankId,
        accountId: doc.accountId,
        accessToken: doc.accessToken,
        fundingSourceUrl: doc.fundingSourceUrl,
        shareableId: doc.shareableId,
        userId: userId,
      };
    });
    return result;
  } catch (error) {
    const empty: TBank[] = [];
    return empty;
  }
}

export const getBankAccount = async (bankId: string) => {
  const DB = await createDatabaseClient();
  const bank = await DB.databases.getDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_BANK_COLLECTION_ID!,
    bankId
  );
  return bank;
};
