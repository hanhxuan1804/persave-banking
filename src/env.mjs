import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    APP_URL: z.string().url().min(1),
    NEXTAUTH_URL: z.string().url().optional(),
    NEXT_APPWRITE_KEY: z.string().min(1),
    NEXT_PUBLIC_APPWRITE_ENDPOINT: z.string().url().min(1),
    NEXT_PUBLIC_APPWRITE_PROJECT: z.string().min(1),
    NEXT_PUBLIC_APPWRITE_DATABASE_ID: z.string().min(1),
    NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID: z.string().min(1),
    NEXT_PUBLIC_APPWRITE_BANK_COLLECTION_ID: z.string().min(1),
    NEXT_PUBLIC_APPWRITE_RATE_COLLECTION_ID: z.string().min(1),
    NEXT_PUBLIC_APPWRITE_TRANSACTION_COLLECTION_ID: z.string().min(1),
    SENTRY_AUTH_TOKEN: z.string().optional(),
    PLAID_CLIENT_ID: z.string().min(1),
    PLAID_SECRET: z.string().min(1),
    PLAID_ENV: z.string().min(1),
    PLAID_PRODUCTS: z.string().min(1),
    PLAID_COUNTRY_CODES: z.string().min(1),
    DWOLLA_ENV: z.string().min(1),
    DWOLLA_KEY: z.string().min(1),
    DWOLLA_SECRET: z.string().min(1),
    DWOLLA_BASE_URL: z.string().min(1),
    SENTRY_SUPPRESS_GLOBAL_ERROR_HANDLER_FILE_WARNING: z.string().optional(),
  },
  client: {},
  runtimeEnv: {
    APP_URL: process.env.APP_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_APPWRITE_KEY: process.env.NEXT_APPWRITE_KEY,
    NEXT_PUBLIC_APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
    NEXT_PUBLIC_APPWRITE_PROJECT: process.env.NEXT_PUBLIC_APPWRITE_PROJECT,
    NEXT_PUBLIC_APPWRITE_DATABASE_ID:
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID:
      process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID,
    NEXT_PUBLIC_APPWRITE_BANK_COLLECTION_ID:
      process.env.NEXT_PUBLIC_APPWRITE_BANK_COLLECTION_ID,
    NEXT_PUBLIC_APPWRITE_RATE_COLLECTION_ID:
      process.env.NEXT_PUBLIC_APPWRITE_RATE_COLLECTION_ID,
    NEXT_PUBLIC_APPWRITE_TRANSACTION_COLLECTION_ID:
      process.env.NEXT_PUBLIC_APPWRITE_TRANSACTION_COLLECTION_ID,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    PLAID_CLIENT_ID: process.env.PLAID_CLIENT_ID,
    PLAID_SECRET: process.env.PLAID_SECRET,
    PLAID_ENV: process.env.PLAID_ENV,
    PLAID_PRODUCTS: process.env.PLAID_PRODUCTS,
    PLAID_COUNTRY_CODES: process.env.PLAID_COUNTRY_CODES,
    DWOLLA_ENV: process.env.DWOLLA_ENV,
    DWOLLA_KEY: process.env.DWOLLA_KEY,
    DWOLLA_SECRET: process.env.DWOLLA_SECRET,
    DWOLLA_BASE_URL: process.env.DWOLLA_BASE_URL,
    SENTRY_SUPPRESS_GLOBAL_ERROR_HANDLER_FILE_WARNING:
      process.env.SENTRY_SUPPRESS_GLOBAL_ERROR_HANDLER_FILE_WARNING,
  },
});
