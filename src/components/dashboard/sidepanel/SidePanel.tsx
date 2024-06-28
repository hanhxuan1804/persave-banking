import React, { FC } from 'react';

import SidePanelBankCards from '@/components/dashboard/sidepanel/SidePanelBankCards';
import SidePanelBudgets from '@/components/dashboard/sidepanel/SidePanelBudgets';
import SidePanelHeader from '@/components/dashboard/sidepanel/SidePanelHeader';
import TAccount from '@/types/account';
import TBank from '@/types/bank';
import TTransaction from '@/types/transaction';
import { TUser } from '@/types/user';

interface SidePanelProps {
  user: TUser;
  accounts: TAccount[];
  transactions: TTransaction[];
}

const banks: TBank[] = [
  {
    $id: 'bank-1',
    accountId: '1',
    bankId: '1',
    accessToken: 'access-token-1',
    fundingSourceUrl: 'https://example.com/funding-source/1',
    userId: 'user-1',
    shareableId: '1',
  },
  {
    $id: 'bank-2',
    accountId: '2',
    bankId: '1',
    accessToken: 'access-token-2',
    fundingSourceUrl: 'https://example.com/funding-source/2',
    userId: 'user-2',
    shareableId: '2',
  },
  {
    $id: 'bank-3',
    accountId: '3',
    bankId: '1',
    accessToken: 'access-token-3',
    fundingSourceUrl: 'https://example.com/funding-source/3',
    userId: 'user-3',
    shareableId: '3',
  },
];

const SidePanel: FC<SidePanelProps> = ({ user, accounts, transactions }) => {
  const bankAccount: TBank[] & TAccount[] = banks.reduce(
    (acc: TBank[] & TAccount[], bank: TBank) => {
      const account = accounts.find((acc) => acc.id === bank.accountId);
      if (account) {
        acc.push({ ...bank, ...account });
      }
      return acc;
    },
    []
  );
  return (
    <div className="size-full">
      {/* header */}
      <SidePanelHeader user={user} />
      {/* bank card section */}
      <SidePanelBankCards user={user} banks={bankAccount} />
      {/* budgets section */}
      <SidePanelBudgets transactions={transactions} />
    </div>
  );
};

export default SidePanel;
