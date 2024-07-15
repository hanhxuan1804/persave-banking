'use server';
import { ID } from 'node-appwrite';

import { createDatabaseClient } from '@/lib/server/appwrite';
import { ActionsResponse } from '@/types';

export const createRate = async (rate: { rates: string; updatedAt: Date }) => {
  const DB = await createDatabaseClient();
  return await DB.databases.createDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_RATE_COLLECTION_ID!,
    ID.unique(),
    rate
  );
};

export const getRate = async () => {
  const DB = await createDatabaseClient();
  const rates = await DB.databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_RATE_COLLECTION_ID!
  );
  if (rates.total === 0) {
    return null;
  }
  return new ActionsResponse(
    'success',
    'Rates fetched',
    rates.documents[0]
  ).get();
};

export const updateRate = async (rate: {
  $id: string;
  rates: string;
  updatedAt: Date;
}) => {
  const DB = await createDatabaseClient();
  return await DB.databases.updateDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_RATE_COLLECTION_ID!,
    rate.$id,
    rate
  );
};
