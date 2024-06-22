import React, { FC } from 'react';

import { Navbar } from '@/components/common/header/navbar/navbar';

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <header className="container fixed right-4 top-0 z-50 w-fit">
      <Navbar />
    </header>
  );
};

export default Header;
