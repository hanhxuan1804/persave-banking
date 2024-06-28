import React, { FC } from 'react';

import ContentHeader from '@/components/ContentHeader';
import * as m from '@/paraglide/messages';

interface pageProps {}

const page: FC<pageProps> = () => {
  return (
    <div className="flex size-full flex-col items-start justify-start px-8 py-6">
      <ContentHeader
        title={m.my_bank_account()}
        subtitle={m.my_bank_subtitle()}
        type="title"
      />
    </div>
  );
};

export default page;
