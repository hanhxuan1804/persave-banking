import { LanguageSwitcher } from './language-switcher';

import { ThemeSwitcher } from '@/components/theme-switcher';
import { Link } from '@/lib/i18n';

export const Navbar = async () => {
  return (
    <div className="w-full">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-mono text-lg font-bold">
          {/* {m.app_name()} */}
        </Link>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};
