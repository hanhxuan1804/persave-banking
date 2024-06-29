import React, { FC } from 'react';

import { CREDIT_CARD_BACKGROUND_COLORS } from '@/lib/constant';
import { cn } from '@/lib/utils';
import { AccountColor } from '@/types/account';

interface CreditCardBackGroundProps {
  color: AccountColor;
}

const CreditCardBackground: FC<CreditCardBackGroundProps> = ({ color }) => {
  return (
    <div
      className={cn(
        CREDIT_CARD_BACKGROUND_COLORS[color],
        'absolute inset-0 -z-10 rounded-lg '
      )}
    >
      <div className="size-full bg-[url(/dragon.svg)] bg-contain bg-center opacity-50"></div>
    </div>
  );
};

export default CreditCardBackground;
