'use client';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { ListFilterIcon } from 'lucide-react';

import ContentHeader from '@/components/ContentHeader';
import AccountCard from '@/components/transaction/AccountCard';
import AccountSelect from '@/components/transaction/AccountSelect';
import TransactionTable from '@/components/TransactionTable';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { ACCOUNTS, BANKS, TRANSACTIONS } from '@/data.example';
import { useMySearchParams } from '@/hooks/useMySearchParams';
import * as m from '@/paraglide/messages';
import TAccount from '@/types/account';

interface pageProps {}
const accounts = ACCOUNTS;
const transactions = TRANSACTIONS;
const banks = BANKS;
const TransactionPage: FC<pageProps> = () => {
  const [selectedAccount, setSelectedAccount] = useState<TAccount>(accounts[0]);
  const [loading, setLoading] = useState(true);
  const [showTransactionPerPage, setShowTransactionPerPage] = useState(5);
  const searchParams = useMySearchParams();
  useEffect(() => {
    const accountId = searchParams.get('accountId');
    const showTransactionPerPage = searchParams.get('showTransactionPerPage');
    if (accountId) {
      setSelectedAccount(
        accounts.find((account) => account.id === accountId) || accounts[0]
      );
    }
    if (showTransactionPerPage) {
      setShowTransactionPerPage(Number(showTransactionPerPage));
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const transaction = transactions.filter(
    (transaction) => transaction.accountId === selectedAccount.id
  );
  const bank = banks.find((bank) => bank.accountId === selectedAccount.id);
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Transaction history - ${selectedAccount.name}`,
  });
  const handleShowTransactionPerPage = (value: number) => {
    searchParams.set('showTransactionPerPage', value.toString());
    setShowTransactionPerPage(value);
  };
  return (
    <div className="dark:bg-background flex size-full flex-col items-start justify-start gap-8 bg-[#fcfcfd4a] px-8 py-6">
      <ContentHeader
        title={m.transactions_history()}
        subtitle={m.transactions_history_subtitle()}
        type="title"
        actions={
          <AccountSelect
            accounts={accounts}
            setSelectAccount={setSelectedAccount}
            isSetQuery={true}
          />
        }
      />
      {!loading ? (
        <>
          {/* account card */}
          <AccountCard account={selectedAccount} />
          {/* transaction table */}
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-row items-center justify-center">
              <h2 className="text-lg font-semibold">{m.history()}</h2>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-1">
                    <ListFilterIcon size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>
                    <span className="text-sm font-semibold">{m.show()}</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={showTransactionPerPage === 5}
                    onCheckedChange={() => handleShowTransactionPerPage(5)}
                  >
                    5 {m.transactions()}
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={showTransactionPerPage === 10}
                    onCheckedChange={() => handleShowTransactionPerPage(10)}
                  >
                    10 {m.transactions()}
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={showTransactionPerPage === 15}
                    onCheckedChange={() => handleShowTransactionPerPage(15)}
                  >
                    15 {m.transactions()}
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Button
              className="rounded-lg bg-[#0179FE] px-4 py-2 "
              onClick={handlePrint}
            >
              {m.data_export()}
            </Button>
          </div>
          <div className="w-full">
            <TransactionTable
              data={transaction}
              bank={bank}
              ref={componentRef}
              maxTransaction={showTransactionPerPage}
            />
          </div>
        </>
      ) : (
        <div className="flex w-full flex-col items-center justify-center gap-8">
          <Skeleton className="h-40 w-full" />
          <div className="flex w-full items-center justify-between">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="h-80 w-full" />
        </div>
      )}
    </div>
  );
};

export default TransactionPage;
