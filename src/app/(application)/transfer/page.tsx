import React, { FC } from 'react';

import ContentHeader from '@/components/ContentHeader';
import TransferForm from '@/components/transfer/TransferForm';
import { ACCOUNTS } from '@/data.example';
import * as m from '@/paraglide/messages';

interface pageProps {}

const Transfer: FC<pageProps> = () => {
  const accounts = ACCOUNTS;
  return (
    <div className="flex size-full flex-col items-start justify-start px-8 py-6">
      <ContentHeader
        title={m.payment_transfer()}
        subtitle={m.payment_transfer_subtitle()}
        type="title"
      />
      <TransferForm accounts={accounts} />
    </div>
  );
};

export default Transfer;
