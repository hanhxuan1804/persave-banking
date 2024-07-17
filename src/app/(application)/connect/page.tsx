import React, { FC } from 'react';

import PlaidLinkButton from '@/components/connect/PlaidLinkButton';
import ContentHeader from '@/components/ContentHeader';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import * as m from '@/paraglide/messages';
import { TUser } from '@/types/user';

interface pageProps {}

const page: FC<pageProps> = async () => {
  const user: TUser = JSON.parse((await getLoggedInUser()) as string);
  return (
    <div className="flex size-full flex-col items-start justify-start px-8 py-6">
      <ContentHeader
        title={m.connect_bank_account()}
        subtitle={m.connect_bank_subtitle()}
        type="title"
      />
      <div className="flex size-full flex-col items-center justify-center">
        <PlaidLinkButton user={user} variant="ghost" />
      </div>
    </div>
  );
};

export default page;
