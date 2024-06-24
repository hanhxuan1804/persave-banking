'use client';
import React, { FC, useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/hooks';
import { selectRates } from '@/lib/redux/feature/rateSlice';
import { transferCurrency } from '@/lib/utils';
import { languageTag } from '@/paraglide/runtime';

interface CountUpAnimateProps {
  balance: number;
}

const CountUpAnimate: FC<CountUpAnimateProps> = ({ balance }) => {
  const countUpProps = {
    en: {
      prefix: '$',
      suffix: '',
      separator: ',',
      decimals: 2,
    },
    vn: {
      prefix: '',
      suffix: '₫',
      separator: '.',
      decimals: 0,
    },
  }[languageTag()];
  const [view, setView] = useState(false);
  const rates = useAppSelector(selectRates);
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    setAmount(transferCurrency(balance, languageTag(), rates));
  }, [balance, rates]);

  return (
    <div className="flex flex-row items-center justify-start gap-2 text-3xl font-semibold">
      {view ? (
        <CountUp
          end={amount}
          duration={2}
          separator={countUpProps.separator}
          suffix={countUpProps.suffix}
          prefix={countUpProps.prefix}
          decimals={countUpProps.decimals}
          className="min-w-[200px]"
        />
      ) : (
        <div className="min-w-[200px]">{'•••••••••••'}</div>
      )}
      <Button variant="ghost" size="sm" onClick={() => setView(!view)}>
        {view ? <EyeOff size={24} /> : <Eye size={24} />}
      </Button>
    </div>
  );
};

export default CountUpAnimate;
