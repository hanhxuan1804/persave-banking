'use client';
import React, { FC } from 'react';
import { LogOut } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { SignOut } from '@/lib/actions/user.actions';
import { TUser } from '@/types/user';

interface SidebarFooterProps {
  user: TUser;
}

const SidebarFooter: FC<SidebarFooterProps> = ({ user }) => {
  const SignOutHandle = async () => {
    await SignOut();
  };
  return (
    <>
      <div className="flex items-center justify-start gap-2 ">
        <Image
          src={user.image}
          alt="avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
        <div className="flex flex-col items-start justify-center ">
          <span className="text-sm font-semibold">{`${user.firstName} ${user.lastName}`}</span>
          <span className="text-[12px] ">{user.email}</span>
        </div>
      </div>
      <Button type="button" variant={'ghost'} onClick={SignOutHandle}>
        <LogOut size={16} />
      </Button>
    </>
  );
};

export default SidebarFooter;
