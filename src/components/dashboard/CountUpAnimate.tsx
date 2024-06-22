'use client';
import React, { FC, useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
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
  const [amount, setAmount] = useState(0);
  const [view, setView] = useState(false);
  useEffect(() => {
    if (languageTag() === 'en') {
      setAmount(balance);
      return;
    }
    if (languageTag() === 'vn') {
      const getRates = async () => {
        // fetch the data from API
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/83ef8e9bb315be7909dc8c52/latest/USD`
        ).then((response) => response.json());

        // save the rates in the state
        if (response.result === 'success') {
          const rate = response.conversion_rates.VND;
          setAmount(balance * rate);
        }
        // handle the error
        else {
          console.error(response.error);
        }
      };
      getRates();
    }
  }, [balance]);
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
