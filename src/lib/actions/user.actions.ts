'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ID, Query } from 'node-appwrite';
import z from 'zod';

import { signInFormSchema } from '@/app/(auth)/signin/page';
import { signUpFormSchema } from '@/app/(auth)/signup/page';
import {
  createAdminClient,
  createDatabaseClient,
  createSessionClient,
} from '@/lib/server/appwrite';
import { ActionsResponse } from '@/types';
import { TUser } from '@/types/user';

export async function SignUp(data: z.infer<typeof signUpFormSchema>) {
  try {
    //create user
    const user = await createUser(data);
    if (!user) {
      return new ActionsResponse('error', 'Email already exists').get();
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
    return new ActionsResponse('error', 'Email already exists').get();
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
      id: user.$id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
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
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
      process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID || '',
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
    const DB = await createDatabaseClient();
    const user = await DB.databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
      process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID || '',
      ID.unique(),
      {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        dob: data.dob,
        address: data.address,
        gender: data.gender,
        password: data.password,
      }
    );
    return user;
  } catch (error) {
    return null;
  }
}
