'use server';

import { ID, Query } from 'node-appwrite';

import { createDatabaseClient } from '@/lib/server/appwrite';
import { ActionsResponse } from '@/types';

const {
  NEXT_PUBLIC_APPWRITE_DATABASE_ID: DATABASE_ID,
  NEXT_PUBLIC_APPWRITE_TRANSACTION_COLLECTION_ID: TRANSACTION_COLLECTION_ID,
} = process.env;
declare interface CreateTransactionProps {
  name: string;
  amount: string;
  senderId: string;
  senderBankId: string;
  receiverId: string;
  receiverBankId: string;
  email: string;
}

declare interface getTransactionsByBankIdProps {
  bankId: string;
}
export const createTransaction = async (
  transaction: CreateTransactionProps
) => {
  try {
    const { databases } = await createDatabaseClient();
    const newTransaction = await databases.createDocument(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      ID.unique(),
      {
        channel: 'online',
        category: 'Transfer',
        ...transaction,
      }
    );

    return new ActionsResponse(
      'success',
      'Transaction created',
      newTransaction
    ).get();
  } catch (error) {
    console.log(error);
  }
};

export const getTransactionsByBankId = async ({
  bankId,
}: getTransactionsByBankIdProps) => {
  try {
    const { databases } = await createDatabaseClient();

    const senderTransactions = await databases.listDocuments(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      [Query.equal('senderBankId', bankId)]
    );

    const receiverTransactions = await databases.listDocuments(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      [Query.equal('receiverBankId', bankId)]
    );

    const transactions = {
      total: senderTransactions.total + receiverTransactions.total,
      documents: [
        ...senderTransactions.documents,
        ...receiverTransactions.documents,
      ],
    };

    return new ActionsResponse(
      'success',
      'Transactions fetched',
      transactions
    ).get();
  } catch (error) {
    console.log(error);
  }
};
