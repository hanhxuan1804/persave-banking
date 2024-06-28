import React, { FC } from 'react';
import Image from 'next/image';

import { TUser } from '@/types/user';

interface SidePanelHeaderProps {
  user: TUser;
}

const SidePanelHeader: FC<SidePanelHeaderProps> = ({ user }) => {
  return (
    <div>
      {/* image */}
      <div className="relative z-0 flex h-32 w-full items-center justify-center bg-[url(/cover.png)] bg-cover bg-center">
        <div className="absolute -bottom-12 left-2 size-24 rounded-full bg-white p-[2px]">
          <div className="flex size-full items-center justify-center rounded-full bg-black/50">
            <Image
              src={user.image}
              alt="avatar"
              width={100}
              height={100}
              className="z-0 rounded-full"
            />
          </div>
        </div>
      </div>
      <div className="pl-28">
        {/* name */}
        <div className="text-lg font-semibold">
          {user.firstName} {user.lastName}
        </div>
        {/* email */}
        <div className="text-sm text-gray-500">{user.email}</div>
      </div>
    </div>
  );
};

export default SidePanelHeader;
