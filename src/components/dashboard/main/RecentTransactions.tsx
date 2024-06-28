import React, { FC } from 'react';

import AccountCard from '@/components/dashboard/main/AccountCard';
import TransactionTable from '@/components/dashboard/main/TransactionTable';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import * as m from '@/paraglide/messages';
import TAccount from '@/types/account';
import TTransaction from '@/types/transaction';

interface RecentTransactionsProps {
  accounts: TAccount[];
  transactions: TTransaction[];
}

const RecentTransactions: FC<RecentTransactionsProps> = ({
  accounts,
  transactions,
}) => {
  const tabs = accounts.map((account) => {
    return {
      value: account.id,
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
                <TransactionTable data={item.content} accountId={item.value} />
              </TabsContent>
            );
          })}
        </Tabs>
      )}
    </div>
  );
};

export default RecentTransactions;
