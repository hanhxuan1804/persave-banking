import React, { FC } from 'react';

import CardList from '@/components/bank/CardList';
import ContentHeader from '@/components/ContentHeader';
import { getAccounts } from '@/lib/actions/account.actions';
import {
  getAllTransactions,
  TransactionsDataResponse,
} from '@/lib/actions/transaction.action';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import * as m from '@/paraglide/messages';
import { AccountDataResponse, ActionsResponse } from '@/types';
import TCreditCard from '@/types/credit-card';
import { TUser } from '@/types/user';

interface pageProps {}

const Bank: FC<pageProps> = async () => {
  // get logged in user
  const userData = await getLoggedInUser();
  const user: TUser = JSON.parse(userData as string);
  // get all accounts
  const accountsData = ActionsResponse.fromJSON(
    await getAccounts(user?.userId)
  ).getData() as AccountDataResponse;
  // get all transactions
  const transactionData = ActionsResponse.fromJSON(
    await getAllTransactions({
      accountIds: accountsData.accounts.map((account) => account.id),
    })
  ).getData() as TransactionsDataResponse;
  const transactions = transactionData.transactions;
  const cards: TCreditCard[] = accountsData.accounts.map((account) => {
    return {
      accountId: account.id,
      bank: account.name,
      name: user.name,
      number: '**** **** **** ' + account.mask,
      expiry: '12/25',
      color: account.color,
    };
  });
  return (
    <div className="flex size-full flex-col items-start justify-start px-8 py-6">
      <ContentHeader
        title={m.my_bank_account()}
        subtitle={m.my_bank_subtitle()}
        type="title"
      />
      <h3 className="mt-4 text-lg font-semibold">{m.your_cards()}</h3>
      <CardList cards={cards} transactions={transactions} />
    </div>
  );
};

export default Bank;
