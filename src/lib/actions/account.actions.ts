'use server';

import { AccountSubtype, AccountType, CountryCode } from 'plaid';

import { getTransactionsByBankId } from '@/lib/actions/transaction.action';
import { getBankAccount, getBankAccounts } from '@/lib/actions/user.actions';
import { plaidClient } from '@/lib/server/plaid';
import { ActionsResponse } from '@/types';
import TAccount, { randomColor } from '@/types/account';
import TTransaction from '@/types/transaction';

export const getAccounts = async (userId: string) => {
  try {
    const banks = await getBankAccounts(userId);
    const accounts = await Promise.all(
      banks.map(async (bank) => {
        const accountsResponse = await plaidClient.accountsGet({
          access_token: bank.accessToken,
        });
        const accountData = accountsResponse.data.accounts[0];
        // get institution info from plaid
        const institution = await getInstitution({
          institutionId: accountsResponse.data.item.institution_id!,
        });

        const account: TAccount = {
          id: accountData.account_id,
          availableBalance: accountData.balances.available!,
          currentBalance: accountData.balances.current!,
          institutionId: institution.institution_id,
          name: accountData.name,
          officialName: accountData.official_name || '',
          mask: accountData.mask!,
          type: accountData.type as AccountType,
          subtype: accountData.subtype! as AccountSubtype,
          appwriteItemId: bank.$id,
          shareableId: bank.shareableId,
          color: randomColor(),
        };
        return account;
      })
    );

    const totalBanks = accounts.length;
    const totalCurrentBalance = accounts.reduce((total, account) => {
      return total + account.currentBalance;
    }, 0);
    return new ActionsResponse('success', 'Accounts fetched', {
      totalBanks,
      totalCurrentBalance,
      accounts,
    }).get();
  } catch (error) {
    return new ActionsResponse('error', (error as Error).message).get();
  }
};
// Get one bank account
export const getAccount = async ({
  appwriteItemId,
}: {
  appwriteItemId: string;
}) => {
  try {
    // get bank from db
    const bank = await getBankAccount(appwriteItemId);

    // get account info from plaid
    const accountsResponse = await plaidClient.accountsGet({
      access_token: bank.accessToken,
    });
    const accountData = accountsResponse.data.accounts[0];
    // get transfer transactions from appwrite
    const transferResponse = await getTransactionsByBankId({
      bankId: bank.$id,
    });
    const transferTransactionsData = ActionsResponse.fromJSON(
      transferResponse || ''
    ).getData() as {
      total: number;
      documents: TTransaction[];
    };
    const transferTransactions = transferTransactionsData.documents;

    // get institution info from plaid
    const institution = await getInstitution({
      institutionId: accountsResponse.data.item.institution_id!,
    });

    const transactionsResponse = await getTransactions({
      accessToken: bank?.accessToken,
    });
    const transactionsResponseData = ActionsResponse.fromJSON(
      transactionsResponse || ''
    ).getData() as {
      transactions: TTransaction[];
    };
    const transactions = transactionsResponseData.transactions;
    const account = {
      id: accountData.account_id,
      availableBalance: accountData.balances.available!,
      currentBalance: accountData.balances.current!,
      institutionId: institution.institution_id,
      name: accountData.name,
      officialName: accountData.official_name,
      mask: accountData.mask!,
      type: accountData.type as string,
      subtype: accountData.subtype! as string,
      appwriteItemId: bank.$id,
    };

    // sort transactions by date such that the most recent transaction is first
    const allTransactions = [...transactions, ...transferTransactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return new ActionsResponse('success', 'Account fetched', {
      account,
      transactions: allTransactions,
    }).get();
  } catch (error) {
    console.error('An error occurred while getting the account:', error);
  }
};

// Get transactions
export const getTransactions = async ({
  accessToken,
}: {
  accessToken: string;
}) => {
  let hasMore = true;
  const transactions: TTransaction[] = [];

  try {
    // Iterate through each page of new transaction updates for item
    while (hasMore) {
      const response = await plaidClient.transactionsSync({
        access_token: accessToken,
      });

      const data = response.data;
      console.log('data', data);
      //   transactions = response.data.added.map((transaction) => ({
      //     id: transaction.transaction_id,
      //     name: transaction.name,
      //     paymentChannel: transaction.payment_channel,
      //     type: transaction.payment_channel,
      //     accountId: transaction.account_id,
      //     amount: transaction.amount,
      //     pending: transaction.pending,
      //     category: transaction.category ? transaction.category[0] : 'Other',
      //     date: transaction.date,
      //     image: transaction.logo_url,
      //     status: 'Success',
      //     channel: 'online',
      //     senderBankId: '',
      //     receiverBankId: '',
      //   }));

      hasMore = data.has_more;
    }

    return new ActionsResponse('success', 'Transactions fetched', {
      transactions,
    }).get();
  } catch (error) {
    console.error('An error occurred while getting the accounts:', error);
  }
};
// Get bank info
export const getInstitution = async ({
  institutionId,
}: {
  institutionId: string;
}) => {
  try {
    const institutionResponse = await plaidClient.institutionsGetById({
      institution_id: institutionId,
      country_codes: ['US'] as CountryCode[],
    });

    const intitution = institutionResponse.data.institution;

    return JSON.parse(JSON.stringify(intitution));
  } catch (error) {
    console.error('An error occurred while getting the accounts:', error);
  }
};
