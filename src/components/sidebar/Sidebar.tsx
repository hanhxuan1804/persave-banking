import React, { FC } from 'react';
import {
  ArrowLeftRight,
  Bolt,
  CircleDollarSign,
  CreditCard,
  Home,
  ScrollText,
  UserRound,
} from 'lucide-react';
import Image from 'next/image';

import CommandSearch from '@/components/sidebar/CommandSearch';
import Navbar from '@/components/sidebar/Navbar';
import SidebarFooter from '@/components/sidebar/SidebarFooter';
import * as m from '@/paraglide/messages';
import { TUser } from '@/types/user';

interface SidebarProps {
  user: TUser;
}

const Sidebar: FC<SidebarProps> = ({ user }) => {
  const listNavItem = [
    { value: 'dashboard', label: m.home(), icon: <Home size={16} /> },
    { value: 'bank', label: m.my_bank(), icon: <CircleDollarSign size={16} /> },
    {
      value: 'transaction',
      label: m.transaction_history(),
      icon: <ScrollText size={16} />,
    },
    {
      value: 'transfer',
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
        <SidebarFooter user={user} />
      </div>
    </div>
  );
};

export default Sidebar;
