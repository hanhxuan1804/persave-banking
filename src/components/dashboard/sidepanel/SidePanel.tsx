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
  banks: TBank[];
}

const SidePanel: FC<SidePanelProps> = ({
  user,
  accounts,
  transactions,
  banks,
}) => {
  const bankAccount: TBank[] & TAccount[] = accounts
    .filter((account) => {
      return banks.find((bank) => bank.accountId === account.id);
    })
    .map((account) => {
      return {
        ...account,
        ...banks.find((bank) => bank.accountId === account.id)!,
      };
    });
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
