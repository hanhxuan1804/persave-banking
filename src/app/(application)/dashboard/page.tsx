import React, { FC } from 'react';

import ContentHeader from '@/components/ContentHeader';
import RecentTransactions from '@/components/dashboard/main/RecentTransactions';
import TotalAccountCard from '@/components/dashboard/main/TotalAccountCard';
import SidePanel from '@/components/dashboard/sidepanel/SidePanel';
import { fetchAccount, getAccounts } from '@/lib/actions/account.actions';
import {
  getAllTransactions,
  TransactionsDataResponse,
} from '@/lib/actions/transaction.action';
import { getBankAccounts, getLoggedInUser } from '@/lib/actions/user.actions';
import * as m from '@/paraglide/messages';
import { AccountDataResponse, ActionsResponse } from '@/types';
import TBank from '@/types/bank';
import { TUser } from '@/types/user';

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = async () => {
  // get logged in user
  const userData = await getLoggedInUser();
  const user: TUser = JSON.parse(userData as string);
  // get all accounts
  const accountsData = ActionsResponse.fromJSON(
    await getAccounts(user?.userId)
  ).getData() as AccountDataResponse;
  const banks = (await getBankAccounts(user?.userId)) as TBank[];
  // fetch all accounts to get the latest data from plaid
  accountsData.accounts.forEach(async (account) => {
    await fetchAccount({ appwriteItemId: account.appwriteItemId });
  });
  // get all transactions
  const transactionData = ActionsResponse.fromJSON(
    await getAllTransactions({
      accountIds: accountsData.accounts.map((account) => account.id),
    })
  ).getData() as TransactionsDataResponse;
  const transactions = transactionData.transactions;
  return (
    <div data-testid="dashboard" className="flex size-full flex-row">
      {/* main */}
      <div className="container flex h-fit min-h-full flex-1 flex-col gap-6 border-r py-6">
        {/* header */}
        <ContentHeader
          title={m.dashboard_welcome()}
          subtitle={m.dashboard_welcome_subtitle()}
          user={user}
          type="greeting"
        />
        {/* account card */}
        <TotalAccountCard
          accounts={accountsData.accounts}
          totalBalance={accountsData.totalCurrentBalance}
          totalBankAccounts={accountsData.totalBanks}
          user={user}
        />
        {/* recent transactions */}
        <RecentTransactions
          banks={banks}
          accounts={accountsData.accounts}
          transactions={transactions}
        />
      </div>
      {/* side panel */}
      <div className="w-[30%]">
        <SidePanel
          user={user}
          banks={banks}
          accounts={accountsData.accounts}
          transactions={transactions}
        />
      </div>
    </div>
  );
};

export default Dashboard;
