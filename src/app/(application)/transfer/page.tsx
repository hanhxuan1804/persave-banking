import React, { FC } from 'react';

import ContentHeader from '@/components/ContentHeader';
import TransferForm from '@/components/transfer/TransferForm';
import { getAccounts } from '@/lib/actions/account.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import * as m from '@/paraglide/messages';
import { AccountDataResponse, ActionsResponse } from '@/types';
import { TUser } from '@/types/user';

interface pageProps {}

const Transfer: FC<pageProps> = async () => {
  // get logged in user
  const userData = await getLoggedInUser();
  const user: TUser = JSON.parse(userData as string);
  // get all accounts
  const accountsData = ActionsResponse.fromJSON(
    await getAccounts(user?.userId)
  ).getData() as AccountDataResponse;
  const accounts = accountsData.accounts;
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
