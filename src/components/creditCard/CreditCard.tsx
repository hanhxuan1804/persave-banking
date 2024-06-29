import React, { FC } from 'react';
import { NfcIcon } from 'lucide-react';
import Image from 'next/image';

import CreditCardBackground from '@/components/creditCard/CreditCardBackground';
import TCreditCard from '@/types/credit-card';

interface CreditCardProps {
  card: TCreditCard;
}

const CreditCard: FC<CreditCardProps> = ({
  card: { bank, name, number, expiry, color },
}) => {
  return (
    <div className="relative aspect-video w-full max-w-[320px]">
      <CreditCardBackground color={color} />
      <div className="flex h-full flex-col justify-between px-3 py-2">
        <div className="flex justify-between">
          <span className="text-lg font-semibold text-white">{bank}</span>
          <NfcIcon size={24} className="text-white" />
        </div>
        <div className="flex w-full justify-between">
          <div className="flex w-fit flex-col font-semibold">
            <div className="flex justify-between">
              <span className="text-white">{name.toLocaleUpperCase()}</span>
              <span className="text-white">{expiry}</span>
            </div>
            <span className="text-white">●●●● ●●●● ●●●● {number}</span>
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
