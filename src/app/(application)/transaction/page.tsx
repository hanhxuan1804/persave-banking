import React, { FC } from 'react';

import Transaction from '@/components/transaction/Transaction';
import { getAccounts } from '@/lib/actions/account.actions';
import {
  getAllTransactions,
  TransactionsDataResponse,
} from '@/lib/actions/transaction.action';
import { getBankAccounts, getLoggedInUser } from '@/lib/actions/user.actions';
import { AccountDataResponse, ActionsResponse } from '@/types';
import { TUser } from '@/types/user';

interface pageProps {}
const TransactionPage: FC<pageProps> = async () => {
  // get logged in user
  const userData = await getLoggedInUser();
  const user: TUser = JSON.parse(userData as string);
  // get all accounts
  const accountsData = ActionsResponse.fromJSON(
    await getAccounts(user.userId)
  ).getData() as AccountDataResponse;
  const accounts = accountsData.accounts;
  // get all transactions
  const transactionData = ActionsResponse.fromJSON(
    await getAllTransactions({
      accountIds: accountsData.accounts.map((account) => account.id),
    })
  ).getData() as TransactionsDataResponse;
  // get all banks
  const banks = await getBankAccounts(user.userId);

  const transactions = transactionData.transactions;
  return (
    <Transaction
      accounts={accounts}
      transactions={transactions}
      banks={banks}
    />
  );
};

export default TransactionPage;
