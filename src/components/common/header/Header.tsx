import React, { FC } from 'react';

import { Navbar } from '@/components/common/header/navbar/navbar';

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <div className="container fixed left-0 top-0 z-50 w-full">
      <Navbar />
    </div>
  );
};

export default Header;
