import React, { FC } from 'react';

import SidePanelBankCards from '@/components/dashboard/sidepanel/SidePanelBankCards';
import SidePanelBudgets from '@/components/dashboard/sidepanel/SidePanelBudgets';
import SidePanelHeader from '@/components/dashboard/sidepanel/SidePanelHeader';
import { BANKS } from '@/data.example';
import TAccount from '@/types/account';
import TBank from '@/types/bank';
import TTransaction from '@/types/transaction';
import { TUser } from '@/types/user';

interface SidePanelProps {
  user: TUser;
  accounts: TAccount[];
  transactions: TTransaction[];
}

const banks = BANKS;

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
      <SidePanelBudgets banks={banks} transactions={transactions} />
    </div>
  );
};

export default SidePanel;
