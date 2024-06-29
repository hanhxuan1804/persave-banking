import React, { FC } from 'react';

import CardList from '@/components/bank/CardList';
import ContentHeader from '@/components/ContentHeader';
import * as m from '@/paraglide/messages';
import TCreditCard from '@/types/credit-card';

interface pageProps {}

const page: FC<pageProps> = () => {
  const cards: TCreditCard[] = [
    {
      bank: 'Bank of America',
      name: 'John Doe',
      number: '1234',
      expiry: '12/23',
      color: 'blue',
    },
    {
      bank: 'Chase',
      name: 'John Doe',
      number: '1234',
      expiry: '12/23',
      color: 'green',
    },
    {
      bank: 'Citi',
      name: 'John Doe',
      number: '1234',
      expiry: '12/23',
      color: 'red',
    },
    {
      bank: 'Wells Fargo',
      name: 'John Doe',
      number: '1234',
      expiry: '12/23',
      color: 'yellow',
    },
  ];
  return (
    <div className="flex size-full flex-col items-start justify-start px-8 py-6">
      <ContentHeader
        title={m.my_bank_account()}
        subtitle={m.my_bank_subtitle()}
        type="title"
      />
      <h3 className="mt-4 text-lg font-semibold">{m.your_cards()}</h3>
      <CardList cards={cards} />
    </div>
  );
};

export default page;
