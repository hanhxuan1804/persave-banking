import React, { FC } from 'react';

import { LanguageSwitcher } from '@/components/language-switcher';
import { ThemeSwitcher } from '@/components/theme-switcher';

interface AppSettingsProps {}

const AppSettings: FC<AppSettingsProps> = () => {
  return (
    <section className=" pointer-events-none fixed left-0 top-0 w-full ">
      <div className="container mt-2 flex w-full items-end justify-end">
        <div className="pointer-events-auto z-50 mr-5 flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </section>
  );
};

export default AppSettings;
