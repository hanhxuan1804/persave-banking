import React, { FC } from 'react';

import CardList from '@/components/bank/CardList';
import ContentHeader from '@/components/ContentHeader';
import { CREDITCARDS } from '@/data.example';
import * as m from '@/paraglide/messages';

interface pageProps {}

const Bank: FC<pageProps> = () => {
  const cards = CREDITCARDS;
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

export default Bank;
