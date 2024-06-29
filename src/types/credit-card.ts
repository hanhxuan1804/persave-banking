import { AccountColor } from '@/types/account';

declare type TCreditCard = {
  bankId: string;
  bank: string;
  name: string;
  number: string;
  expiry: string;
  color: AccountColor;
};

export default TCreditCard;
