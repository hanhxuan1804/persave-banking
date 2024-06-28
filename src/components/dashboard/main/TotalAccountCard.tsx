import React, { FC } from 'react';
import { Plus } from 'lucide-react';

import CountUpAnimate from '@/components/dashboard/main/CountUpAnimate';
import DoughnutChart from '@/components/dashboard/main/DoughnutChart';
import { Button } from '@/components/ui/button';
import * as m from '@/paraglide/messages';
import TAccount from '@/types/account';

interface TotalAccountCardProps {
  accounts: TAccount[];
  totalBalance: number;
  totalBankAccounts: number;
}

const TotalAccountCard: FC<TotalAccountCardProps> = ({
  accounts,
  totalBalance,
  totalBankAccounts,
}) => {
  return (
    <div className="flex w-full flex-row gap-4 rounded-lg border p-4 shadow-md dark:bg-gray-500">
      {/* chart */}
      <div className="aspect-square h-28">
        <DoughnutChart accounts={accounts} />
      </div>
      {/* info */}
      <div className="flex flex-1 flex-col gap-2">
        {/* bank accounts */}
        <div className="flex flex-row items-center justify-between gap-2">
          <h2 className="text-base font-semibold">
            {m.dashboard_account_count()} {totalBankAccounts}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            className="font-semibold text-[#0179FE] hover:text-[#4893FF] dark:text-[#a7ccf8] dark:hover:text-[#0179FE]"
          >
            <Plus size={16} strokeWidth={3} />
            <span className="ml-1">{m.dashboard_account_add_bank()}</span>
          </Button>
        </div>
        {/* balance */}
        <div className="flex flex-col gap-2">
          <span className="text-sm opacity-70">
            {m.dashboard_account_balance()}
          </span>
          <CountUpAnimate balance={totalBalance} />
        </div>
      </div>
    </div>
  );
};

export default TotalAccountCard;
