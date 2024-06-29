import { AccountColor } from '@/types/account';

declare type TCreditCard = {
  bank: string;
  name: string;
  number: string;
  expiry: string;
  color: AccountColor;
};

export default TCreditCard;
