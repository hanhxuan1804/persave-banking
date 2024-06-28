import React, { FC } from 'react';
import { Plus } from 'lucide-react';

import CreditCardGroup from '@/components/dashboard/sidepanel/creditCard/CreditCardGroup';
import { Button } from '@/components/ui/button';
import * as m from '@/paraglide/messages';
import TAccount from '@/types/account';
import TBank from '@/types/bank';
import { TUser } from '@/types/user';

interface SidePanelBankCardsProps {
  banks: TBank[] & TAccount[];
  user: TUser;
}

const SidePanelBankCards: FC<SidePanelBankCardsProps> = ({ banks, user }) => {
  return (
    <div className="p-4">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-lg font-semibold">
          {m.dashboard_sidepanel_my_banks()}
        </h2>
        <Button
          variant="ghost"
          className="text-sm text-blue-500 hover:text-blue-400"
        >
          <Plus size={16} />
          <span className="ml-2">{m.dashboard_account_add_bank()}</span>
        </Button>
      </div>
      {/* cards group */}
      <CreditCardGroup banks={banks} user={user} />
    </div>
  );
};

export default SidePanelBankCards;
