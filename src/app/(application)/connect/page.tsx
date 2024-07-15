import React, { FC } from 'react';

import PlaidLinkButton from '@/components/connect/PlaidLinkButton';
import ContentHeader from '@/components/ContentHeader';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { TUser } from '@/types/user';

interface pageProps {}

const page: FC<pageProps> = async () => {
  const user: TUser = JSON.parse((await getLoggedInUser()) as string);
  return (
    <div className="flex size-full flex-col items-start justify-start px-8 py-6">
      <ContentHeader
        title="Connect Bank Account"
        subtitle="Connect your bank account via Plaid"
        type="title"
      />
      <div className="flex size-full flex-col items-center justify-center">
        <PlaidLinkButton user={user} variant="ghost" />
      </div>
    </div>
  );
};

export default page;
