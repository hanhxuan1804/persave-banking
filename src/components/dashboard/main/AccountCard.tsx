'use client';
import React, { FC, useEffect, useState } from 'react';

import { useAppSelector } from '@/hooks';
import {
  ACCOUNT_COLOR_VARIANTS,
  ACCOUNT_COLOR_VARIANTS_BACKGROUND,
  ACCOUNT_SUBTYPES_COLOR_VARIANTS,
  ACCOUNT_SUBTYPES_LABLES,
} from '@/lib/constant';
import { selectRates } from '@/lib/redux/feature/rateSlice';
import { cn, formatCurrency } from '@/lib/utils';
import { languageTag } from '@/paraglide/runtime';
import TAccount from '@/types/account';

interface AccountCardProps {
  account: TAccount;
}

const AccountCard: FC<AccountCardProps> = ({ account }) => {
  const rates = useAppSelector(selectRates);
  const [subtype, setSubtype] = useState<string>(account.subtype);
  useEffect(() => {
    setSubtype(ACCOUNT_SUBTYPES_LABLES[account.subtype]);
  }, [account.subtype]);
  return (
    <div
      className={cn(
        'my-4 flex w-full flex-row items-center justify-center rounded-lg px-6 py-5',
        ACCOUNT_COLOR_VARIANTS[account.color]
      )}
    >
      {/* avatar */}
      <div
        className={cn(
          'flex size-10 items-center justify-center rounded-full font-semibold text-white',
          ACCOUNT_COLOR_VARIANTS_BACKGROUND[account.color]
        )}
      >
        {account.officialName
          .split(' ')
          .map((word) => word[0])
          .slice(0, 2)
          .join('')}
      </div>
      {/* balance */}
      <div className="ml-2 flex flex-1 flex-col">
        <div className="flex flex-row justify-between font-semibold">
          <span className="text-lg text-black">{account.officialName}</span>
          <span
            className={cn(
              'rounded-full border px-2 py-1 text-sm font-semibold',
              ACCOUNT_SUBTYPES_COLOR_VARIANTS[account.subtype]
            )}
          >
            {subtype}
          </span>
        </div>
        <span
          className={cn(
            'text-lg font-semibold',
            ACCOUNT_COLOR_VARIANTS[account.color],
            'bg-transparent'
          )}
        >
          {formatCurrency(account.currentBalance, languageTag(), rates)}
        </span>
      </div>
    </div>
  );
};

export default AccountCard;
