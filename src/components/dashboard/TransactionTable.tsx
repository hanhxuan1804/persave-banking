'use client';

import React, { FC } from 'react';

import TableTransactionImage from '@/components/dashboard/TableTransactionImage';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAppSelector } from '@/hooks';
import {
  CATEGORY_GROUP_MAP,
  TRANSACTION_CATEGORY_COLOR_VARIANTS,
} from '@/lib/constant';
import { selectRates } from '@/lib/redux/feature/rateSlice';
import { cn, formatCurrency, formatDateTime } from '@/lib/utils';
import * as m from '@/paraglide/messages';
import { languageTag } from '@/paraglide/runtime';
import TTransaction, { Category } from '@/types/transaction';

interface TransactionTableProps {
  data: TTransaction[];
  accountId: string;
}

const TransactionTable: FC<TransactionTableProps> = ({ data, accountId }) => {
  const rates = useAppSelector(selectRates);

  return (
    <Table>
      <TableHeader className="bg-[#F9FAFB] dark:bg-transparent">
        <TableRow>
          <TableHead className="">{m.table_header_transaction()}</TableHead>
          <TableHead>{m.table_header_amount()}</TableHead>
          <TableHead>{m.table_header_status()}</TableHead>
          <TableHead>{m.table_header_date()}</TableHead>
          <TableHead className="">{m.table_header_category()}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((transaction, index) => {
          return (
            <TableRow
              key={index}
              className={`${
                transaction.status === 'Success'
                  ? 'bg-[#027a480e]  dark:bg-[#027a482b]'
                  : transaction.status === 'Processing'
                    ? 'bg-transparent dark:bg-transparent'
                    : 'bg-[#b422180e]  dark:bg-[#b422182b]'
              }`}
            >
              <TableCell className="flex flex-row items-center justify-start">
                <TableTransactionImage
                  url={transaction.image}
                  name={transaction.name}
                  variant={
                    TRANSACTION_CATEGORY_COLOR_VARIANTS[
                      CATEGORY_GROUP_MAP[transaction.category]
                    ]
                  }
                />
                <span className="ml-2 font-semibold">{transaction.name}</span>
              </TableCell>
              <TableCell
                className={`${
                  transaction.senderBankId === accountId
                    ? 'text-red-500'
                    : 'text-green-500'
                } font-bold`}
              >
                {transaction.senderBankId === accountId ? '- ' : '+ '}
                {formatCurrency(transaction.amount, languageTag(), rates)}
              </TableCell>
              <TableCell>
                <span
                  className={`${
                    transaction.status === 'Success'
                      ? 'bg-[#027a481c] text-[#027A48] dark:bg-[#027a4879] dark:text-[#027A48]'
                      : transaction.status === 'Processing'
                        ? 'bg-[#3440541c] text-[#344054] dark:bg-gray-800 dark:text-gray-200'
                        : 'bg-[#b422181c] text-[#B42318] dark:bg-[#b4221879] dark:text-[#B42318]'
                  } text-nowrap rounded-full px-2 py-1 text-sm font-semibold`}
                >
                  •{' '}
                  {transaction.status === 'Success'
                    ? m.table_content_status_success()
                    : transaction.status === 'Processing'
                      ? m.table_content_status_processing()
                      : m.table_content_status_declined()}
                </span>
              </TableCell>
              <TableCell className="font-semibold">
                {formatDateTime(transaction.date, languageTag())}
              </TableCell>
              <TableCell>
                <span
                  className={cn(
                    'text-nowrap rounded-full border-2 px-2 py-1 text-sm font-semibold',
                    TRANSACTION_CATEGORY_COLOR_VARIANTS[
                      CATEGORY_GROUP_MAP[transaction.category as Category]
                    ]
                  )}
                >
                  {transaction.category}
                </span>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TransactionTable;
