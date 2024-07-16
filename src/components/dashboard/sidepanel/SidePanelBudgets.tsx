import React, { FC } from 'react';
import {
  AirplayIcon,
  CoinsIcon,
  EllipsisVerticalIcon,
  PizzaIcon,
} from 'lucide-react';

import ProgressBar from '@/components/ProgressBar';
import { Button } from '@/components/ui/button';
import {
  CATEGORY_GROUP_COLOR,
  CATEGORY_GROUP_MAP,
  TRANSACTION_CATEGORY_COLOR_VARIANTS,
} from '@/lib/constant';
import { cn } from '@/lib/utils';
import * as m from '@/paraglide/messages';
import TTransaction, { TCategoryGroup } from '@/types/transaction';

interface SidePanelBudgetsProps {
  transactions: TTransaction[];
}
const budgets: Record<TCategoryGroup, number> = {
  Subscriptions: 1000,
  'Food and booze': 1000,
  Savings: 1000,
};

const SidePanelBudgets: FC<SidePanelBudgetsProps> = ({ transactions }) => {
  const iconsMap = {
    Subscriptions: <AirplayIcon size={20} />,
    'Food and booze': <PizzaIcon size={20} />,
    Savings: <CoinsIcon size={20} />,
  };
  const usingBudgets: Record<TCategoryGroup, number> = transactions.reduce(
    (acc: Record<TCategoryGroup, number>, transaction) => {
      if (transaction.amount < 0) {
        const categoryGroup = CATEGORY_GROUP_MAP[transaction.category];
        if (categoryGroup in acc) {
          acc[categoryGroup] += -transaction.amount;
        }
      }
      return acc;
    },
    {
      Subscriptions: 0,
      'Food and booze': 0,
      Savings: 0,
    }
  );
  const budgetLeft = Object.entries(budgets).reduce(
    (acc, [categoryGroup, budget]) => {
      //format 2 digits after decimal point
      acc[categoryGroup as TCategoryGroup] = (
        budget - usingBudgets[categoryGroup as TCategoryGroup]
      ).toFixed(2) as unknown as number;
      return acc;
    },
    {
      Subscriptions: 0,
      'Food and booze': 0,
      Savings: 0,
    }
  );
  return (
    <div className="px-4">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-lg font-semibold">
          {m.dashboard_sidepanel_my_budgets()}
        </h2>
        <Button
          variant="ghost"
          className="aspect-square rounded-full p-1 text-lg hover:text-blue-400"
        >
          <EllipsisVerticalIcon size={20} />
        </Button>
      </div>
      {/* budgets */}
      <div className="mt-2 flex flex-col">
        {Object.entries(budgets).map(([categoryGroup, budget]) => (
          <div
            key={categoryGroup}
            className={cn(
              'mt-3 flex w-full flex-row items-center justify-start gap-4 rounded-lg p-4',
              TRANSACTION_CATEGORY_COLOR_VARIANTS[
                categoryGroup as TCategoryGroup
              ] as string
            )}
          >
            {/* icon */}
            <div className="flex size-10 items-center justify-center rounded-full bg-white">
              {iconsMap[categoryGroup as TCategoryGroup]}
            </div>
            {/* content */}
            <div className="w-full">
              {/* info */}
              <div className="flex w-full flex-row items-end justify-between text-xs font-semibold">
                <p className="text-sm">{categoryGroup}</p>
                <p
                  className={
                    budgetLeft[categoryGroup as TCategoryGroup] > 0
                      ? 'text-green-500'
                      : 'text-red-500'
                  }
                >
                  {budgetLeft[categoryGroup as TCategoryGroup] > 0
                    ? `${budgetLeft[categoryGroup as TCategoryGroup]} left`
                    : `${-budgetLeft[categoryGroup as TCategoryGroup]} over`}
                </p>
              </div>
              {/* progress */}
              <ProgressBar
                progress={usingBudgets[categoryGroup as TCategoryGroup]}
                total={budget}
                color={CATEGORY_GROUP_COLOR[categoryGroup as TCategoryGroup]}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidePanelBudgets;
