'use client';
import React, { FC, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { Link } from '@/lib/i18n';
import { isAvailableLanguageTag } from '@/paraglide/runtime';

interface NavbarProps {
  items: { value: string; label: string; icon: React.JSX.Element }[];
}

const Navbar: FC<NavbarProps> = ({ items }) => {
  const [selectItem, setSelectItem] = useState('');
  const pathname = usePathname();
  useEffect(() => {
    let location = pathname.split('/')[1];
    if (isAvailableLanguageTag(location)) {
      location = pathname.split('/')[2];
    }
    location && setSelectItem(location);
  }, [pathname]);
  const selectClass = 'bg-gradient-to-r from-[#0179FE] to-[#4893FF] text-white';
  return (
    <nav className="flex w-full flex-col gap-2">
      {items.map((item) => (
        <Link
          key={item.value}
          className={`${item.value === selectItem ? selectClass : 'hover:bg-gray-200 dark:hover:bg-gray-700'} flex w-full cursor-pointer items-center justify-start gap-2 rounded-lg p-2 text-sm font-semibold`}
          href={`/${item.value}`}
        >
          {item.icon}
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
