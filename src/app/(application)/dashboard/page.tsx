import React, { FC } from 'react';

import ContentHeader from '@/components/ContentHeader';
import AccountCard from '@/components/dashboard/AccountCard';
import Divider from '@/components/ui/divider';
import * as m from '@/paraglide/messages';
import TAccount from '@/types/account';
import { TUser } from '@/types/user';

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {
  const user: TUser = {
    id: '1',
    email: 'example@gmail.com',
    firstName: 'John',
    lastName: 'Doe',
    image: '/avatar.webp',
  };
  const accounts: TAccount[] = [
    {
      id: '1',
      availableBalance: 1000,
      currentBalance: 1000,
      officialName: 'Chase Checking',
      mask: '0000',
      institutionId: '1',
      name: 'Chase Checking',
      type: 'depository',
      subtype: 'checking',
      appwriteItemId: '1',
      shareableId: '1',
      color: '#0179FE',
    },
    {
      id: '2',
      availableBalance: 2000,
      currentBalance: 2000,
      officialName: 'Chase Savings',
      mask: '0000',
      institutionId: '1',
      name: 'Chase Savings',
      type: 'depository',
      subtype: 'savings',
      appwriteItemId: '2',
      shareableId: '2',
      color: '#4893FF',
    },
    {
      id: '3',
      availableBalance: 3000,
      currentBalance: 3000,
      officialName: 'Chase Credit Card',
      mask: '0000',
      institutionId: '1',
      name: 'Chase Credit Card',
      type: 'credit',
      subtype: 'credit card',
      appwriteItemId: '3',
      shareableId: '3',
      color: '#F472B6',
    },
  ];
  return (
    <div data-testid="dashboard" className=" flex size-full flex-row">
      {/* main */}
      <div className="container flex flex-1 flex-col">
        {/* TODO: breadcrumb */}
        {/* header */}
        <ContentHeader
          title={m.dashboard_welcome()}
          subtitle={m.dashboard_welcome_subtitle()}
          user={user}
          type="greeting"
        />
        <Divider />
        {/* account card */}
        <AccountCard
          accounts={accounts}
          totalBalance={accounts.reduce(
            (acc, account) => acc + account.currentBalance,
            0
          )}
          totalBankAccounts={accounts.length}
        />
      </div>
      {/* side panel */}
      <div className="w-[30%]">
        <h2>Side Panel</h2>
      </div>
    </div>
  );
};

export default Dashboard;
