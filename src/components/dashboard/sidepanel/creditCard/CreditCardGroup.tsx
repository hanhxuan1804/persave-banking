import React, { FC } from 'react';

import CreditCard from '@/components/dashboard/sidepanel/creditCard/CreditCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import TAccount from '@/types/account';
import TBank from '@/types/bank';
import { TUser } from '@/types/user';

interface CreditCardGroupProps {
  banks: TBank[] & TAccount[];
  user: TUser;
}

const CreditCardGroup: FC<CreditCardGroupProps> = ({ banks, user }) => {
  return (
    <div className="my-6">
      <Carousel orientation="vertical">
        <CarouselContent className="h-60 w-full py-1">
          {banks.map((bank: TAccount, index: number) => (
            <CarouselItem key={bank.id} className="relative basis-1">
              <div className="h-56">
                {index < banks.length - 1 && (
                  <div className="absolute left-0 top-14 -z-10 w-full ">
                    <CreditCard
                      accountName={banks[index + 1].officialName}
                      name={user.firstName + ' ' + user.lastName}
                      cardNumber={banks[index + 1].mask}
                      expiryDate="12/23"
                      color={banks[index + 1].color}
                    />
                  </div>
                )}
                <CreditCard
                  accountName={bank.officialName}
                  name={user.firstName + ' ' + user.lastName}
                  cardNumber={bank.mask}
                  expiryDate="12/23"
                  color={bank.color}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CreditCardGroup;
