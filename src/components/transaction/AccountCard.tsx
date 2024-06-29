import React, { FC } from 'react';

import CountUpAnimate from '@/components/dashboard/main/CountUpAnimate';
import {
  ACCOUNT_COLOR_VARIANTS,
  ACCOUNT_COLOR_VARIANTS_BACKGROUND,
} from '@/lib/constant';
import { cn } from '@/lib/utils';
import * as m from '@/paraglide/messages';
import TAccount from '@/types/account';

interface AccountCardProps {
  account: TAccount;
}

const AccountCard: FC<AccountCardProps> = ({ account }) => {
  return (
    <div
      className={cn(
        'flex w-full items-center justify-between rounded-lg p-6 text-lg font-semibold text-white',
        ACCOUNT_COLOR_VARIANTS_BACKGROUND[account.color]
      )}
    >
      <div className="flex  flex-col gap-2">
        <span>{account.name}</span>
        <span className="text-xs font-thin">{`${account.officialName}`}</span>
        <span className="">{`●●●● ●●●● ●●●● ${account.mask}`}</span>
      </div>
      <div
        className={cn(
          'flex h-full flex-col justify-center gap-1 rounded-lg p-2',
          ACCOUNT_COLOR_VARIANTS[account.color]
        )}
      >
        <span className="text-sm ">{m.current_balance()}</span>
        <div className="text-xl font-bold ">
          <CountUpAnimate balance={account.currentBalance} />
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
