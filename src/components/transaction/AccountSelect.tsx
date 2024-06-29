import React, { FC, useEffect } from 'react';
import { SelectValue } from '@radix-ui/react-select';
import { CreditCardIcon } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { useMySearchParams } from '@/hooks/useMySearchParams';
import TAccount from '@/types/account';

interface AccountSelectDropdownProps {
  accounts: TAccount[];
  setSelectAccount: (account: TAccount) => void;
}

const AccountSelect: FC<AccountSelectDropdownProps> = ({
  accounts,
  setSelectAccount,
}) => {
  const [defaultValue, setDefaultValue] = React.useState(accounts[0].name);
  const searchParams = useMySearchParams();
  const onSelectAccount = (accountId: string) => {
    searchParams.setMultiple({
      accountId: accountId,
      page: '1',
    });
    setSelectAccount(
      accounts.find((account) => account.id === accountId) || accounts[0]
    );
  };
  useEffect(() => {
    const accountId = searchParams.get('accountId');
    if (accountId) {
      setDefaultValue(
        accounts.find((account) => account.id === accountId)?.name ||
          'Select account'
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Select onValueChange={(value) => onSelectAccount(value as string)}>
      <SelectTrigger className="bg-background min-w-[200px] text-sm font-semibold">
        <CreditCardIcon color="blue" />
        <SelectValue placeholder={defaultValue} />
      </SelectTrigger>
      <SelectContent className="font-semibold">
        {accounts.map((account) => (
          <SelectItem key={account.id} value={account.id}>
            {account.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AccountSelect;
