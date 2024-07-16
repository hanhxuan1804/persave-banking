'use server';

import { ID, Query } from 'node-appwrite';
import { TransactionPaymentChannelEnum } from 'plaid';

import { createDatabaseClient } from '@/lib/server/appwrite';
import { ActionsResponse } from '@/types';
import TTransaction from '@/types/transaction';

const {
  NEXT_PUBLIC_APPWRITE_DATABASE_ID: DATABASE_ID,
  NEXT_PUBLIC_APPWRITE_TRANSACTION_COLLECTION_ID: TRANSACTION_COLLECTION_ID,
} = process.env;
declare interface getTransactionsByAccountProps {
  accountId: string;
}
export interface TransactionsDataResponse {
  transactions: TTransaction[];
  total: number;
}
export const checkTransactionExist = async (transactionId: string) => {
  try {
    const { databases } = await createDatabaseClient();
    const transactions = await databases.listDocuments(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      [Query.equal('id', transactionId)]
    );

    return transactions.total > 0;
  } catch (error) {
    console.log(error);
  }
};

export const createTransaction = async (
  transaction: CreateTransactionProps
) => {
  try {
    const { databases } = await createDatabaseClient();
    const isExist = await checkTransactionExist(transaction.id);
    if (isExist) {
      return new ActionsResponse('error', 'Transaction already exists').get();
    }
    const newTransaction = await databases.createDocument(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      ID.unique(),
      {
        ...transaction,
        amount: parseFloat(transaction.amount.toString()),
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

export const getTransactionsByAccount = async ({
  accountId,
}: getTransactionsByAccountProps) => {
  try {
    const { databases } = await createDatabaseClient();

    const transactions = await databases.listDocuments(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      [Query.equal('accountId', accountId)]
    );
    const transactionsData: TTransaction[] = transactions.documents.map(
      (doc) => {
        const tx: TTransaction = {
          $id: doc.$id,
          id: doc.id,
          name: doc.name,
          paymentChannel: doc.paymentChannel,
          type: doc.type,
          accountId: doc.accountId,
          amount: doc.amount,
          pending: doc.pending,
          category: doc.category,
          date: doc.date,
          image: doc.image,
          status: doc.status,
          channel: doc.channel,
          $createdAt: doc.$createdAt,
          senderId: doc.senderId,
          receiverId: doc.receiverId,
          senderBankId: doc.senderBankId,
          receiverBankId: doc.receiverBankId,
        };
        return tx;
      }
    );
    return new ActionsResponse('success', 'Transactions fetched', {
      transactions: transactionsData,
      total: transactions.total,
    }).get();
  } catch (error) {
    console.log(error);
  }
};
export const getAllTransactions = async ({
  accountIds,
}: {
  accountIds: string[];
}) => {
  try {
    const transactionsData = await Promise.all(
      accountIds.map(async (accountId) => {
        const data = await getTransactionsByAccount({ accountId });
        return ActionsResponse.fromJSON(data || '').getData();
      })
    );
    let total = 0;
    const transactions: TTransaction[] = [];
    transactionsData.forEach((data) => {
      const responseData = data as TransactionsDataResponse;
      transactions.push(...responseData.transactions);
      total += responseData.total;
    });

    return new ActionsResponse('success', 'Transactions fetched', {
      transactions,
      total,
    }).get();
  } catch (error) {
    const err = error as Error;
    return new ActionsResponse('error', err.message, Error).get();
  }
};
interface CreateTransactionProps {
  id: string;
  name: string;
  paymentChannel: TransactionPaymentChannelEnum;
  type: TransactionPaymentChannelEnum;
  accountId: string;
  amount: number;
  pending: boolean;
  category: string;
  date: string;
  image: string | null | undefined;
  status: string;
  channel: TransactionPaymentChannelEnum;
}
export const createMultiTransaction = async ({
  transactions,
}: {
  transactions: CreateTransactionProps[];
}) => {
  try {
    await Promise.all(
      transactions.map(
        async (transaction) => await createTransaction(transaction)
      )
    );
  } catch (error) {
    console.log(error);
  }
};
