import React, { FC } from 'react';

import CreditCard from '@/components/creditCard/CreditCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import TAccount from '@/types/account';
import TBank from '@/types/bank';
import TCreditCard from '@/types/credit-card';
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
                      card={
                        {
                          bank: banks[index + 1].officialName,
                          name: user.firstName + ' ' + user.lastName,
                          number: banks[index + 1].mask,
                          expiry: '12/23',
                          color: banks[index + 1].color,
                        } as TCreditCard
                      }
                    />
                  </div>
                )}
                <CreditCard
                  card={
                    {
                      bank: bank.officialName,
                      name: user.firstName + ' ' + user.lastName,
                      number: bank.mask,
                      expiry: '12/23',
                      color: bank.color,
                    } as TCreditCard
                  }
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
