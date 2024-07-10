import React, { FC } from 'react';

import ContentHeader from '@/components/ContentHeader';
import RecentTransactions from '@/components/dashboard/main/RecentTransactions';
import TotalAccountCard from '@/components/dashboard/main/TotalAccountCard';
import SidePanel from '@/components/dashboard/sidepanel/SidePanel';
import { ACCOUNTS, BANKS, TRANSACTIONS } from '@/data.example';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import * as m from '@/paraglide/messages';
import { TUser } from '@/types/user';

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = async () => {
  const userData = await getLoggedInUser();
  const user: TUser = JSON.parse(userData as string);
  const accounts = ACCOUNTS.slice(0, 3);
  const transactions = TRANSACTIONS;
  const banks = BANKS;
  return (
    <div data-testid="dashboard" className="flex size-full flex-row">
      {/* main */}
      <div className="container flex h-fit min-h-full flex-1 flex-col gap-6 border-r py-6">
        {/* TODO:OPTIONAL breadcrumb */}
        {/* header */}
        <ContentHeader
          title={m.dashboard_welcome()}
          subtitle={m.dashboard_welcome_subtitle()}
          user={user}
          type="greeting"
        />
        {/* account card */}
        <TotalAccountCard
          accounts={accounts}
          totalBalance={accounts.reduce(
            (acc, account) => acc + account.currentBalance,
            0
          )}
          totalBankAccounts={accounts.length}
        />
        {/* recent transactions */}
        <RecentTransactions
          banks={banks}
          accounts={accounts}
          transactions={transactions}
        />
      </div>
      {/* side panel */}
      <div className="w-[30%]">
        <SidePanel
          user={user}
          accounts={accounts}
          transactions={transactions}
        />
      </div>
    </div>
  );
};

export default Dashboard;
