'use server';

import { AccountSubtype, AccountType, CountryCode } from 'plaid';

import { createMultiTransaction } from '@/lib/actions/transaction.action';
import { getBankAccount, getBankAccounts } from '@/lib/actions/user.actions';
import { plaidClient } from '@/lib/server/plaid';
import { ActionsResponse } from '@/types';
import TAccount, { randomColor } from '@/types/account';
import { randomCategory } from '@/types/transaction';

export const getAccounts = async (userId: string) => {
  try {
    const banks = await getBankAccounts(userId);
    const accounts = await Promise.all(
      banks.map(async (bank) => {
        const accountsResponse = await plaidClient.accountsGet({
          access_token: bank.accessToken,
        });
        const accountData = accountsResponse.data.accounts.find(
          (account) => account.account_id === bank.accountId
        )!;
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
// Feth account data one bank account
export const fetchAccount = async ({
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

    // get institution info from plaid
    await getInstitution({
      institutionId: accountsResponse.data.item.institution_id!,
    });

    await getTransactionsFromPlaid({
      accessToken: bank?.accessToken,
    });
    // sort transactions by date such that the most recent transaction is first
    // const allTransactions = [...transferTransactions].sort(
    //   (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    // );

    return new ActionsResponse('success', 'Account fetched').get();
  } catch (error) {
    console.error('An error occurred while getting the account:', error);
  }
};

// Get transactions
export const getTransactionsFromPlaid = async ({
  accessToken,
}: {
  accessToken: string;
}) => {
  let hasMore = true;
  try {
    // Iterate through each page of new transaction updates for item
    while (hasMore) {
      const response = await plaidClient.transactionsSync({
        access_token: accessToken,
      });

      const data = response.data;
      const transactionsPlaid = data.added.map((transaction) => ({
        id: transaction.transaction_id,
        name: transaction.name,
        paymentChannel: transaction.payment_channel,
        type: transaction.payment_channel,
        accountId: transaction.account_id,
        amount: transaction.amount,
        pending: transaction.pending,
        category: transaction.category
          ? transaction.category[0]
          : randomCategory(),
        date: transaction.date,
        image: transaction.logo_url,
        status: calculateStatus({
          pending: transaction.pending,
          date: transaction.date,
        }),
        channel: transaction.payment_channel,
      }));
      if (transactionsPlaid.length > 0) {
        await createMultiTransaction({
          transactions: transactionsPlaid,
        });
      }
      hasMore = data.has_more;
    }

    return new ActionsResponse('success', 'Transactions fetched').get();
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
function calculateStatus({
  pending,
  date,
}: {
  pending: boolean;
  date: string;
}) {
  if (pending) {
    return 'Processing';
  }

  const transactionDate = new Date(date);
  //if the transaction date is less than the current date - 2 day return success
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 2);

  if (transactionDate < currentDate) {
    return 'Success';
  }

  return 'Declined';
}
