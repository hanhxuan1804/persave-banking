import React, { FC } from 'react';

import AccountCard from '@/components/dashboard/AccountCard';
import TransactionTable from '@/components/dashboard/TransactionTable';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import * as m from '@/paraglide/messages';
import TAccount from '@/types/account';
import TTransaction from '@/types/transaction';

interface RecentTransactionsProps {
  accounts: TAccount[];
}
const transactions: TTransaction[] = [
  // Transactions for account 1
  {
    id: '1-1',
    $id: '1-1',
    name: 'Groceries',
    paymentChannel: 'online',
    accountId: '1',
    amount: 250,
    pending: true,
    category: 'Groceries',
    date: '2024-06-22T12:00:00Z',
    image: 'https://example.com/transaction/1/1.png',
    type: 'debit',
    $createdAt: '2024-06-22T12:00:00Z',
    channel: 'online',
    senderBankId: '1',
    receiverBankId: '2',
    status: 'Processing',
  },
  {
    id: '1-2',
    $id: '1-2',
    name: 'Rent',
    paymentChannel: 'in-store',
    accountId: '1',
    amount: 450,
    pending: false,
    category: 'Housing',
    date: '2024-06-22T12:00:00Z',
    image: 'https://example.com/transaction/1/2.png',
    type: 'credit',
    $createdAt: '2024-06-22T12:00:00Z',
    channel: 'in-store',
    senderBankId: '2',
    receiverBankId: '1',
    status: 'Declined',
  },
  {
    id: '1-3',
    $id: '1-3',
    name: 'Utilities',
    paymentChannel: 'online',
    accountId: '1',
    amount: 120,
    pending: true,
    category: 'Subscription',
    date: '2024-06-22T12:00:00Z',
    image: 'https://example.com/transaction/1/3.png',
    type: 'debit',
    $createdAt: '2024-06-22T12:00:00Z',
    channel: 'online',
    senderBankId: '1',
    receiverBankId: '2',
    status: 'Processing',
  },
  {
    id: '1-4',
    $id: '1-4',
    name: 'Salary',
    paymentChannel: 'in-store',
    accountId: '1',
    amount: 700,
    pending: false,
    category: 'Income',
    date: '2024-06-22T12:00:00Z',
    image: 'https://example.com/transaction/1/4.png',
    type: 'credit',
    $createdAt: '2024-06-22T12:00:00Z',
    channel: 'in-store',
    senderBankId: '1',
    receiverBankId: '2',
    status: 'Success',
  },
  {
    id: '1-5',
    $id: '1-5',
    name: 'Dining Out',
    paymentChannel: 'online',
    accountId: '1',
    amount: 80,
    pending: true,
    category: 'Food and Drink',
    date: '2024-06-22T12:00:00Z',
    image: 'https://example.com/transaction/1/5.png',
    type: 'debit',
    $createdAt: '2024-06-22T12:00:00Z',
    channel: 'online',
    senderBankId: '2',
    receiverBankId: '1',
    status: 'Processing',
  },

  // Transactions for account 2
  {
    id: '2-1',
    $id: '2-1',
    name: 'Groceries',
    paymentChannel: 'online',
    accountId: '2',
    amount: 300,
    pending: false,
    category: 'Food and Drink',
    date: '2024-06-22T12:00:00Z',
    image: 'https://example.com/transaction/2/1.png',
    type: 'debit',
    $createdAt: '2024-06-22T12:00:00Z',
    channel: 'online',
    senderBankId: '2',
    receiverBankId: '1',
    status: 'Success',
  },
  {
    id: '2-2',
    $id: '2-2',
    name: 'Rent',
    paymentChannel: 'in-store',
    accountId: '2',
    amount: 800,
    pending: true,
    category: 'Housing',
    date: '2024-06-22T12:00:00Z',
    image: 'https://example.com/transaction/2/2.png',
    type: 'credit',
    $createdAt: '2024-06-22T12:00:00Z',
    channel: 'in-store',
    senderBankId: '1',
    receiverBankId: '2',
    status: 'Processing',
  },
  {
    id: '2-3',
    $id: '2-3',
    name: 'Utilities',
    paymentChannel: 'online',
    accountId: '2',
    amount: 150,
    pending: false,
    category: 'Utilities',
    date: '2024-06-22T12:00:00Z',
    image: 'https://example.com/transaction/2/3.png',
    type: 'debit',
    $createdAt: '2024-06-22T12:00:00Z',
    channel: 'online',
    senderBankId: '2',
    receiverBankId: '1',
    status: 'Success',
  },
  {
    id: '2-4',
    $id: '2-4',
    name: 'Salary',
    paymentChannel: 'in-store',
    accountId: '2',
    amount: 2000,
    pending: true,
    category: 'Income',
    date: '2024-06-22T12:00:00Z',
    image: 'https://example.com/transaction/2/4.png',
    type: 'credit',
    $createdAt: '2024-06-22T12:00:00Z',
    channel: 'in-store',
    senderBankId: '2',
    receiverBankId: '1',
    status: 'Processing',
  },
  {
    id: '2-5',
    $id: '2-5',
    name: 'Dining Out',
    paymentChannel: 'online',
    accountId: '2',
    amount: 100,
    pending: false,
    category: 'Food and Drink',
    date: '2024-06-22T12:00:00Z',
    image: 'https://example.com/transaction/2/5.png',
    type: 'debit',
    $createdAt: '2024-06-22T12:00:00Z',
    channel: 'online',
    senderBankId: '1',
    receiverBankId: '2',
    status: 'Success',
  },

  // Transactions for account 3
  {
    id: '3-1',
    $id: '3-1',
    name: 'Groceries',
    paymentChannel: 'online',
    accountId: '3',
    amount: 220,
    pending: true,
    category: 'Food',
    date: '2024-06-22T12:00:00Z',
    image: 'https://example.com/transaction/3/1.png',
    type: 'debit',
    $createdAt: '2024-06-22T12:00:00Z',
    channel: 'online',
    senderBankId: '3',
    receiverBankId: '1',
    status: 'Processing',
  },
  {
    id: '3-2',
    $id: '3-2',
    name: 'Rent',
    paymentChannel: 'in-store',
    accountId: '3',
    amount: 600,
    pending: false,
    category: 'Housing',
    date: '2024-06-22T12:00:00Z',
    image: 'https://example.com/transaction/3/2.png',
    type: 'credit',
    $createdAt: '2024-06-22T12:00:00Z',
    channel: 'in-store',
    senderBankId: '3',
    receiverBankId: '1',
    status: 'Success',
  },
  {
    id: '3-3',
    $id: '3-3',
    name: 'Utilities',
    paymentChannel: 'online',
    accountId: '3',
    amount: 130,
    pending: true,
    category: 'Utilities',
    date: '2024-06-22T12:00:00Z',
    image: 'https://example.com/transaction/3/3.png',
    type: 'debit',
    $createdAt: '2024-06-22T12:00:00Z',
    channel: 'online',
    senderBankId: '1',
    receiverBankId: '3',
    status: 'Processing',
  },
  {
    id: '3-4',
    $id: '3-4',
    name: 'Salary',
    paymentChannel: 'in-store',
    accountId: '3',
    amount: 1500,
    pending: false,
    category: 'Income',
    date: '2024-06-22T12:00:00Z',
    image: 'https://example.com/transaction/3/4.png',
    type: 'credit',
    $createdAt: '2024-06-22T12:00:00Z',
    channel: 'in-store',
    senderBankId: '1',
    receiverBankId: '3',
    status: 'Success',
  },
  {
    id: '3-5',
    $id: '3-5',
    name: 'Dining Out',
    paymentChannel: 'online',
    accountId: '3',
    amount: 90,
    pending: true,
    category: 'Food and Drink',
    date: '2024-06-22T12:00:00Z',
    image: 'https://example.com/transaction/3/5.png',
    type: 'debit',
    $createdAt: '2024-06-22T12:00:00Z',
    channel: 'online',
    senderBankId: '1',
    receiverBankId: '3',
    status: 'Processing',
  },
];

const RecentTransactions: FC<RecentTransactionsProps> = ({ accounts }) => {
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
