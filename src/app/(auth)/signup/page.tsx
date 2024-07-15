'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addYears, format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRootMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SignUp } from '@/lib/actions/user.actions';
import { Link } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import * as m from '@/paraglide/messages';
import { ActionsResponse } from '@/types';

export const signUpFormSchema = z
  .object({
    firstName: z.string().min(2, {
      message: 'First name must be at least 2 characters long',
    }),
    lastName: z.string().min(2, {
      message: 'Last name must be at least 2 characters long',
    }),
    address: z.string().min(1, {
      message: 'Address is required',
    }),
    dob: z.date({
      required_error: 'Date of birth is required',
    }),
    gender: z.enum(['male', 'female', 'other']),
    email: z.string().email(),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters long',
    }),
    confirmPassword: z.string().min(8, {
      message: 'Password must be at least 8 characters long',
    }),
    city: z.string().min(1, {
      message: 'City is required',
    }),
    state: z.string().min(1, {
      message: 'State is required',
    }),
    postalCode: z.string().min(1, {
      message: 'Postal code is required',
    }),
    ssn: z.string().min(1, {
      message: 'SSN is required',
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });
const SignUpPage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      address: '',
      dob: addYears(new Date(), -18),
      gender: 'male',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const onSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
    const signUp = await SignUp(values);
    const response = ActionsResponse.fromJSON(signUp);
    if (response.status === 'error') {
      form.setError('root', {
        type: 'manual',
        message: response.message,
      });
    }
    if (response.status === 'success') {
      router.push('/dashboard');
    }
  };
  return (
    <div className="mx-auto flex h-full w-[420px] flex-col items-start justify-center gap-8 py-10">
      {/* logo */}
      <div className="flex flex-row items-end justify-start gap-1">
        <Image src="/logo.svg" alt="logo" width={32} height={32} />
        <h1 className="text-2xl font-bold">Persave</h1>
      </div>
      {/* form */}
      <div className="flex flex-col items-start justify-center gap-6">
        <div className="flex flex-col items-start justify-center gap-4">
          <Label className="text-4xl font-[600]">{m.sign_up()}</Label>
          <Label className="text-base font-light">
            {m.enter_your_details()}
          </Label>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col items-start justify-center gap-2"
          >
            <div className="flex flex-row items-center justify-between">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-[48%]">
                    <FormLabel>{m.first_name()}</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={m.enter_first_name()}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-[48%]">
                    <FormLabel>{m.last_name()}</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={m.enter_last_name()}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{m.address()}</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={m.enter_address()}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row items-center justify-between">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="w-[48%]">
                    <FormLabel>{m.city()}</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={m.enter_city()}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="w-[48%]">
                    <FormLabel>{m.state()}</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={m.enter_state()}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row items-center justify-between">
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem className="w-[48%]">
                    <FormLabel>{m.postal_code()}</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={m.enter_postal_code()}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ssn"
                render={({ field }) => (
                  <FormItem className="w-[48%]">
                    <FormLabel>{m.SSN()}</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={m.enter_ssn()}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full flex-row items-center justify-between gap-2">
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="w-48% flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto size-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          captionLayout="dropdown-buttons"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date('1960-01-01') ||
                            date > addYears(new Date(), -18)
                          }
                          fromYear={1960}
                          toYear={new Date().getFullYear() - 18}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="mb-2 w-[48%]">
                    <FormLabel>{m.gender()}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={'male'}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">{m.male()}</SelectItem>
                        <SelectItem value="female">{m.female()}</SelectItem>
                        <SelectItem value="other">{m.other()}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{m.email()}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={m.enter_email()}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{m.password()}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={m.enter_password()}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{m.confirm_password()}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={m.confirm_password()}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormRootMessage />
            <Button
              type="submit"
              className="mt-2 w-full bg-gradient-to-r from-[#0179FE] to-[#4893FF]"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Loader2 className="mr-2 size-4 animate-spin" />
              )}
              {m.sign_up()}
            </Button>
          </form>
        </Form>
        <div className="flex w-full flex-row items-center justify-center gap-2">
          <Label className="text-sm font-[400]">
            {m.already_have_account()}
          </Label>
          <Link
            href="/signin"
            className="cursor-pointer text-sm font-[600] text-[#0179FE] hover:underline"
          >
            {m.sign_in()}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
