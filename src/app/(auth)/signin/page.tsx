'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
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
import { SignIn } from '@/lib/actions/user.actions';
import { Link } from '@/lib/i18n';
import * as m from '@/paraglide/messages';
import { ActionsResponse } from '@/types';

export const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters long',
  }),
});
const SignInPage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = async (values: z.infer<typeof signInFormSchema>) => {
    const signIn = await SignIn(values);
    const response = ActionsResponse.fromJSON(signIn);
    if (response.status === 'error') {
      form.setError('root', {
        type: 'manual',
        message: 'Invalid email or password',
      });
    }
    if (response.status === 'success') {
      router.push('/dashboard');
    }
  };
  return (
    <div className="mx-auto flex h-full w-[360px] flex-col items-start justify-center gap-10">
      {/* logo */}
      <div className="flex flex-row items-end justify-start gap-1">
        <Image src="/logo.svg" alt="logo" width={32} height={32} />
        <h1 className="text-2xl font-bold">Persave</h1>
      </div>
      {/* form */}
      <div className="flex flex-col items-start justify-center gap-8">
        <div className="flex flex-col items-start justify-center gap-6">
          <Label className="text-4xl font-[600]">{m.sign_in()}</Label>
          <Label className="text-base font-light">{m.welcome_message()}</Label>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col items-start justify-center gap-6"
          >
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
            <FormRootMessage />
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#0179FE] to-[#4893FF]"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Loader2 className="mr-2 size-4 animate-spin" />
              )}
              {m.sign_in()}
            </Button>
          </form>
        </Form>
        <div className="flex w-full flex-row items-center justify-center gap-2">
          <Label className="text-sm font-[400]">{m.dont_have_account()}</Label>
          <Link
            href="/signup"
            className="cursor-pointer text-sm font-[600] text-[#0179FE] hover:underline"
          >
            {m.sign_up()}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
