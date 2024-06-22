import React, { FC } from 'react';

import { TUser } from '@/types/user';

interface ContentHeaderProps {
  title: string;
  subtitle: string;
  user: TUser;
  type: string;
}

const ContentHeader: FC<ContentHeaderProps> = ({
  title,
  subtitle,
  user,
  type,
}) => {
  return (
    <div className="flex flex-col gap-2  ">
      <h1 className="text-2xl font-semibold">
        <span>{title}</span>
        {type === 'greeting' && (
          <span
            className="cursor-pointer bg-gradient-to-r from-[#0179FE] to-[#4893FF] bg-clip-text font-bold text-transparent hover:underline"
            // onClick={() => router.push('/profile')}
          >
            {user.firstName}
          </span>
        )}
      </h1>
      <span className="text-sm opacity-70">{subtitle}</span>
    </div>
  );
};

export default ContentHeader;
