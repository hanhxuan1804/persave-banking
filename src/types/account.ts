import { AccountSubtype, AccountType } from 'plaid';

declare type TAccount = {
  id: string;
  availableBalance: number;
  currentBalance: number;
  officialName: string;
  mask: string;
  institutionId: string;
  name: string;
  type: AccountType;
  subtype: AccountSubtype;
  appwriteItemId: string;
  shareableId: string;
  color: AccountColor;
};
declare type AccountColor =
  | 'red'
  | 'green'
  | 'blue'
  | 'yellow'
  | 'purple'
  | 'pink'
  | 'indigo'
  | 'cyan'
  | 'teal'
  | 'gray';
export default TAccount;
export type { AccountColor };
export const randomColor = (): AccountColor => {
  const colors = [
    'red',
    'green',
    'blue',
    'yellow',
    'purple',
    'pink',
    'indigo',
    'cyan',
    'teal',
    'gray',
  ];
  return colors[Math.floor(Math.random() * colors.length)] as AccountColor;
};
