import React, { FC } from 'react';

import AccountCard from '@/components/dashboard/main/AccountCard';
import TransactionTable from '@/components/TransactionTable';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import * as m from '@/paraglide/messages';
import TAccount from '@/types/account';
import TBank from '@/types/bank';
import TTransaction from '@/types/transaction';

interface RecentTransactionsProps {
  banks: TBank[];
  accounts: TAccount[];
  transactions: TTransaction[];
}

const RecentTransactions: FC<RecentTransactionsProps> = ({
  banks,
  accounts,
  transactions,
}) => {
  const tabs = accounts.map((account) => {
    return {
      value: account.id,
      bank: banks.find((bank) => bank.accountId === account.id),
      color: account.color,
      amount: account.currentBalance,
      label: account.officialName,
      content: transactions.filter(
        (transaction) => transaction.accountId === account.id
      ),
    };
  });
  return (
    <div className="flex w-full flex-col">
      {/* title */}
      <div className="flex w-full flex-row justify-between">
        <h2 className="text-2xl font-semibold">
          {m.dashboard_content_recent_transaction()}
        </h2>
        <Button variant={'outline'}>
          {m.dashboard_content_view_all_button()}
        </Button>
      </div>
      {/* content */}
      {tabs.length > 0 && (
        <Tabs
          defaultValue={tabs[0].value}
          className="mt-2 flex flex-col items-center justify-center"
        >
          <TabsList>
            {tabs.map((item, index) => {
              return (
                <TabsTrigger key={index} value={item.value}>
                  {item.label}
                </TabsTrigger>
              );
            })}
          </TabsList>
          {tabs.map((item, index) => {
            return (
              <TabsContent key={index} value={item.value} className="w-full">
                <AccountCard
                  account={
                    accounts.find((a) => a.id === item.value) || accounts[0]
                  }
                />
                <TransactionTable
                  data={item.content.slice(0, 5)}
                  bank={item.bank}
                />
              </TabsContent>
            );
          })}
        </Tabs>
      )}
    </div>
  );
};

export default RecentTransactions;
