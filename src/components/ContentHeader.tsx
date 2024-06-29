import React, { FC } from 'react';

import Divider from '@/components/ui/divider';
import { TUser } from '@/types/user';

interface ContentHeaderProps {
  title: string;
  subtitle: string;
  user?: TUser;
  type: string;
  actions?: React.ReactNode;
}

const ContentHeader: FC<ContentHeaderProps> = ({
  title,
  subtitle,
  user,
  type,
  actions,
}) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full flex-row gap-1">
        <div className="flex flex-1 flex-col gap-2">
          <h1 className="text-3xl font-semibold">
            <span>{title}</span>
            {type === 'greeting' && (
              <span
                className="cursor-pointer bg-gradient-to-r from-[#0179FE] to-[#4893FF] bg-clip-text font-bold text-transparent hover:underline"
                // onClick={() => router.push('/profile')}
              >
                {user && user.firstName}
              </span>
            )}
          </h1>
          <span className="text-sm opacity-70">{subtitle}</span>
        </div>
        {actions && (
          <div className="mr-20 flex h-full items-end justify-center gap-2">
            {actions}
          </div>
        )}
      </div>
      <Divider />
    </div>
  );
};

export default ContentHeader;
