'use client';
import React, { FC, useEffect, useState } from 'react';

import CreditCard from '@/components/creditCard/CreditCard';
import ProgressBar from '@/components/ProgressBar';
import { useAppSelector } from '@/hooks';
import { CREDIT_CARD_BACKGROUND_COLORS } from '@/lib/constant';
import { selectRates } from '@/lib/redux/feature/rateSlice';
import { formatCurrency } from '@/lib/utils';
import * as m from '@/paraglide/messages';
import { languageTag } from '@/paraglide/runtime';
import TCreditCard from '@/types/credit-card';

interface CardListProps {
  cards: TCreditCard[];
}
const MAX_SPEND = 1000;
interface DataCard extends TCreditCard {
  spending: number;
  totalBudget: number;
  spendingLabel: string;
}

const CardList: FC<CardListProps> = ({ cards }) => {
  const rate = useAppSelector(selectRates);
  const [data, setData] = useState<DataCard[]>([]);

  useEffect(() => {
    const newData = cards.map((card) => {
      const spending = Math.floor(Math.random() * MAX_SPEND);
      const totalBudget = MAX_SPEND;
      const spendingLabel = formatCurrency(spending, languageTag(), rate);
      return {
        ...card,
        spending,
        totalBudget,
        spendingLabel,
      };
    });
    setData(newData);
  }, [cards, rate]);
  return (
    <div className="mt-4 flex flex-row flex-wrap justify-stretch gap-11 pb-10">
      {data.map((card, index) => (
        <div key={index} className="w-[300px] drop-shadow-sm ">
          <CreditCard card={card} />
          <div className="mt-2 flex w-full justify-between text-xs font-semibold">
            <span className="">{m.spending_this_month()}</span>
            <span className="">{card.spendingLabel}</span>
          </div>
          <ProgressBar
            progress={card.spending}
            total={card.totalBudget}
            color={CREDIT_CARD_BACKGROUND_COLORS[card.color]}
          />
        </div>
      ))}
    </div>
  );
};

export default CardList;
