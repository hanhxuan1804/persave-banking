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
export const randomColor = (name = ''): AccountColor => {
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
  if (name !== '' && name.length > 0) {
    //if name have Saving or Savings, return green
    if (
      name.toLowerCase().includes('saving') ||
      name.toLowerCase().includes('savings')
    ) {
      return 'green';
    }
    //if name have Checking, return blue
    if (name.toLowerCase().includes('checking')) {
      return 'blue';
    }
  }
  return colors[Math.floor(Math.random() * colors.length)] as AccountColor;
};
