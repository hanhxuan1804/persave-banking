declare type TAccount = {
  id: string;
  availableBalance: number;
  currentBalance: number;
  officialName: string;
  mask: string;
  institutionId: string;
  name: string;
  type: AccountTypes;
  subtype: AccountSubtype;
  appwriteItemId: string;
  shareableId: string;
  color: AccountColor;
};
declare type AccountTypes =
  | 'depository'
  | 'credit'
  | 'loan'
  | 'investment'
  | 'other';
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
declare type AccountSubtype =
  | 'checking'
  | 'savings'
  | 'credit card'
  | 'line of credit'
  | 'mortgage'
  | 'auto'
  | 'personal'
  | 'student'
  | 'investment'
  | 'other';
export default TAccount;
export type { AccountTypes, AccountColor, AccountSubtype };
