import React, { FC } from 'react';
import {
  ArrowLeftRight,
  Bolt,
  CircleDollarSign,
  CreditCard,
  Home,
  LogOut,
  ScrollText,
  UserRound,
} from 'lucide-react';
import Image from 'next/image';

import CommandSearch from '@/components/sidebar/CommandSearch';
import Navbar from '@/components/sidebar/Navbar';
import { Button } from '@/components/ui/button';
import * as m from '@/paraglide/messages';
import { TUser } from '@/types/user';

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = () => {
  const listNavItem = [
    { value: 'dashboard', label: m.home(), icon: <Home size={16} /> },
    { value: 'bank', label: m.my_bank(), icon: <CircleDollarSign size={16} /> },
    {
      value: 'transaction',
      label: m.transaction_history(),
      icon: <ScrollText size={16} />,
    },
    {
      value: 'payment',
      label: m.payment_transfer(),
      icon: <ArrowLeftRight size={16} />,
    },
    {
      value: 'connect',
      label: m.connect_bank(),
      icon: <CreditCard size={16} />,
    },
    { value: 'profile', label: m.profile(), icon: <UserRound size={16} /> },
    { value: 'setting', label: m.settings(), icon: <Bolt size={16} /> },
  ];
  const listNavItemRender = listNavItem.filter(
    (item) => item.value !== 'profile' && item.value !== 'setting'
  );
  const user: TUser = {
    id: '1',
    email: 'example@gmail.com',
    firstName: 'John',
    lastName: 'Doe',
    image: '/avatar.webp',
  };
  return (
    <div className=" flex size-full flex-col items-center justify-between">
      {/* top */}
      <div className="flex w-full flex-col items-center justify-center gap-6">
        {/* logo */}
        <div className="flex w-full flex-row items-end justify-start gap-1">
          <Image src="/logo.svg" alt="logo" width={32} height={32} />
          <h1 className="text-2xl font-bold">Persave</h1>
        </div>
        {/* search box */}
        <CommandSearch commands={listNavItem} placeholder={m.search()} />
        {/* nav bar */}
        <Navbar items={listNavItemRender} />
      </div>
      {/* bottom */}
      <div className="flex w-full items-center justify-between gap-2 border-t pt-4">
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
        <Button variant={'ghost'}>
          <LogOut size={16} />
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
