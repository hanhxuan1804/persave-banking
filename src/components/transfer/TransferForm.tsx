'use client';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

import AccountSelect from '@/components/transaction/AccountSelect';
import { Button } from '@/components/ui/button';
import Divider from '@/components/ui/divider';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import * as m from '@/paraglide/messages';
import TAccount from '@/types/account';

interface TransferFormProps {
  accounts: TAccount[];
}

const transferFormSchema = z.object({
  source: z.string().min(1, {
    message: 'Source bank is required',
  }),
  note: z.string(),
  amount: z.number().min(1, {
    message: 'Minimum amount to transfer is 1 USD',
  }),
  destinationEmail: z.string().email().min(1, {
    message: 'Email is required',
  }),
  destinationBank: z.string().min(1, {
    message: 'Destination bank is required',
  }),
});

const TransferForm: FC<TransferFormProps> = ({ accounts }) => {
  const form = useForm<z.infer<typeof transferFormSchema>>({
    resolver: zodResolver(transferFormSchema),
    defaultValues: {
      source: accounts[0].id,
      note: '',
      amount: 0,
      destinationEmail: '',
      destinationBank: '',
    },
  });
  const onSubmit = (values: z.infer<typeof transferFormSchema>) => {
    console.log('submitting form');
    console.log(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full pb-20">
        <h3 className="mt-4 text-lg font-semibold">{m.transfer_details()}</h3>
        <span className="text-sm text-gray-500">
          {m.enter_the_detail_of_the_recipient()}
        </span>
        <Divider />
        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem className="my-6 flex max-w-[850px] flex-row items-start justify-start gap-8 space-y-0">
              <div className="flex min-w-[280px] flex-col items-start justify-center gap-2">
                <FormLabel>{m.select_source_bank()}</FormLabel>
                <FormDescription className="text-xs">
                  {m.transfer_select_source_bank_description()}
                </FormDescription>
              </div>
              <div className="flex w-full flex-col items-start justify-start gap-2">
                <FormControl>
                  <AccountSelect
                    accounts={accounts}
                    setSelectAccount={(account) => field.onChange(account.id)}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem className="my-6 flex max-w-[850px] flex-row items-start justify-start gap-8 space-y-0">
              <div className="flex min-w-[280px] max-w-[280px] flex-col items-start justify-center gap-2">
                <FormLabel>{m.transfer_note_optional()}</FormLabel>
                <FormDescription className="text-xs">
                  {m.transfer_note_description()}
                </FormDescription>
              </div>
              <div className="flex w-full flex-col items-start justify-start gap-2">
                <FormControl>
                  <Textarea placeholder={m.enter_transfer_note()} {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Divider />
        <h3 className="mt-4 text-lg font-semibold">
          {m.bank_account_details()}
        </h3>
        <span className="text-sm text-gray-500">
          {m.transfer_bank_account_details_descriptions()}
        </span>
        <Divider />
        <FormField
          control={form.control}
          name="destinationEmail"
          render={({ field }) => (
            <FormItem className="my-6 flex max-w-[850px] flex-row items-start justify-start gap-8 space-y-0">
              <div className="flex min-w-[280px] flex-col items-start justify-center gap-2">
                <FormLabel>{m.recipient_email_address()}</FormLabel>
              </div>
              <div className="flex w-full flex-col items-start justify-start gap-2">
                <FormControl>
                  <Input
                    type="email"
                    placeholder={m.enter_recipient_email_address()}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="destinationBank"
          render={({ field }) => (
            <FormItem className="my-6 flex max-w-[850px] flex-row items-start justify-start gap-8 space-y-0">
              <div className="flex min-w-[280px] flex-col items-start justify-center gap-2">
                <FormLabel>{m.recipient_bank_account_number()}</FormLabel>
              </div>
              <div className="flex w-full flex-col items-start justify-start gap-2">
                <FormControl>
                  <Input
                    placeholder={m.enter_recipient_bank_account_number()}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="my-6 flex max-w-[850px] flex-row items-start justify-start gap-8 space-y-0">
              <div className="flex min-w-[280px] flex-col items-start justify-center gap-2">
                <FormLabel>{m.amount_in_usd()}</FormLabel>
              </div>
              <div className="flex w-full flex-col items-start justify-start gap-2">
                <FormControl>
                  <Input
                    type="number"
                    placeholder={m.enater_amount_to_transfer()}
                    onChange={(e) => {
                      field.onChange(parseFloat(e.target.value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mt-4 w-full max-w-[850px] rounded-lg bg-gradient-to-r from-[#0179FE] to-[#4893FF] px-4 py-2 font-semibold text-white hover:to-[#0179FE]"
        >
          {m.transfer_funds()}
        </Button>
      </form>
    </Form>
  );
};

export default TransferForm;
