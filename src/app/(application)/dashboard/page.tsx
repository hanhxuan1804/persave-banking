import React, { FC } from 'react';

import ContentHeader from '@/components/ContentHeader';
import RecentTransactions from '@/components/dashboard/main/RecentTransactions';
import TotalAccountCard from '@/components/dashboard/main/TotalAccountCard';
import SidePanel from '@/components/dashboard/sidepanel/SidePanel';
import * as m from '@/paraglide/messages';
import TAccount from '@/types/account';
import TTransaction from '@/types/transaction';
import { TUser } from '@/types/user';

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {
  const user: TUser = {
    id: '1',
    email: 'example@gmail.com',
    firstName: 'John',
    lastName: 'Doe',
    image: '/avatar.webp',
  };
  const accounts: TAccount[] = [
    {
      id: '1',
      availableBalance: 1000,
      currentBalance: 1000,
      officialName: 'Chase Checking',
      mask: '0000',
      institutionId: '1',
      name: 'Chase Checking',
      type: 'depository',
      subtype: 'checking',
      appwriteItemId: '1',
      shareableId: '1',
      color: 'blue',
    },
    {
      id: '2',
      availableBalance: 2000,
      currentBalance: 2000,
      officialName: 'Chase Savings',
      mask: '0000',
      institutionId: '1',
      name: 'Chase Savings',
      type: 'depository',
      subtype: 'savings',
      appwriteItemId: '2',
      shareableId: '2',
      color: 'green',
    },
    {
      id: '3',
      availableBalance: 3000,
      currentBalance: 3000,
      officialName: 'Chase Credit Card',
      mask: '0000',
      institutionId: '1',
      name: 'Chase Credit Card',
      type: 'credit',
      subtype: 'credit card',
      appwriteItemId: '3',
      shareableId: '3',
      color: 'red',
    },
  ];
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
  return (
    <div data-testid="dashboard" className="flex size-full flex-row">
      {/* main */}
      <div className="container flex h-fit min-h-full flex-1 flex-col gap-6 border-r py-6">
        {/* TODO:OPTIONAL breadcrumb */}
        {/* header */}
        <ContentHeader
          title={m.dashboard_welcome()}
          subtitle={m.dashboard_welcome_subtitle()}
          user={user}
          type="greeting"
        />
        {/* account card */}
        <TotalAccountCard
          accounts={accounts}
          totalBalance={accounts.reduce(
            (acc, account) => acc + account.currentBalance,
            0
          )}
          totalBankAccounts={accounts.length}
        />
        {/* recent transactions */}
        <RecentTransactions accounts={accounts} transactions={transactions} />
      </div>
      {/* side panel */}
      <div className="w-[30%]">
        <SidePanel
          user={user}
          accounts={accounts}
          transactions={transactions}
        />
      </div>
    </div>
  );
};

export default Dashboard;
