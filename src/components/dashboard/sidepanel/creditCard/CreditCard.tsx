import React, { FC } from 'react';
import { NfcIcon } from 'lucide-react';
import Image from 'next/image';

import CreditCardBackground from '@/components/dashboard/sidepanel/creditCard/CreditCardBackground';
import { AccountColor } from '@/types/account';

interface CreditCardProps {
  accountName: string;
  name: string;
  cardNumber: string;
  expiryDate: string;
  color: AccountColor;
}

const CreditCard: FC<CreditCardProps> = ({
  accountName,
  name,
  cardNumber,
  expiryDate,
  color,
}) => {
  return (
    <div className="relative aspect-video w-full">
      <CreditCardBackground color={color} />
      <div className="flex h-full flex-col justify-between px-3 py-2">
        <div className="flex justify-between">
          <span className="text-lg font-semibold text-white">
            {accountName}
          </span>
          <NfcIcon size={24} className="text-white" />
        </div>
        <div className="flex w-full justify-between">
          <div className="flex w-fit flex-col font-semibold">
            <div className="flex justify-between">
              <span className="text-white">{name.toLocaleUpperCase()}</span>
              <span className="text-white">{expiryDate}</span>
            </div>
            <span className="text-white">●●●● ●●●● ●●●● {cardNumber}</span>
          </div>
          <Image
            src={'visa.svg'}
            alt="visa"
            width={50}
            height={50}
            className="opacity-80"
          />
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
