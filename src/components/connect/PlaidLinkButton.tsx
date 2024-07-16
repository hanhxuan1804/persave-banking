'use client';
import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from 'react-plaid-link';

import { Button } from '@/components/ui/button';
import {
  createLinkToken,
  exchangePublicToken,
} from '@/lib/actions/user.actions';
import { ActionsResponse } from '@/types';
import { TUser } from '@/types/user';

interface PlaidLinkButtonProps extends React.PropsWithChildren {
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  user: TUser;
  className?: string;
  children?: React.ReactNode;
}

const PlaidLinkButton: FC<PlaidLinkButtonProps> = ({
  variant = 'default',
  size = 'default',
  user,
  className = '',
  children = (
    <p className="text-sm font-semibold text-[#0179fc]">
      Connect a bank account
    </p>
  ),
}) => {
  const [token, setToken] = useState<string>('');
  useEffect(() => {
    const fetchToken = async () => {
      const response = await createLinkToken(user);
      const data: { linkToken?: string } =
        ActionsResponse.fromJSON(response).getData()!;
      setToken(data.linkToken!);
    };
    fetchToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      await exchangePublicToken({ user, publicToken: public_token });
    },
    [user]
  );

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);
  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => open()}
      disabled={!ready}
      className={className}
    >
      {children}
    </Button>
  );
};

export default PlaidLinkButton;
