'use client';
import React, { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { validationLoginSchema, TLoginSchema } from '@/definitions/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { InputField } from '@/components/ui/InputField';
import Divider from '@/components/auth/Divider';
import AuthButton from '@/components/auth/OAuthButton';
import { iconEmail, iconPassword } from '@/definitions/constants';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const router = useRouter();
  const defaultValues = useMemo(
    () => ({
      email: '',
      password: '',
    }),
    [],
  );
  const form = useForm<TLoginSchema>({
    resolver: zodResolver(validationLoginSchema),
    defaultValues,
  });

  async function onAuthenticate(form: TLoginSchema) {
    try {
      const signInCredentials = await signIn('credentials', {
        email: form.email,
        password: form.password,
        redirect: false,
      });
      console.log(signInCredentials);
      if (signInCredentials?.error) {
        switch (signInCredentials.error) {
          case 'CredentialsSignin':
            return { error: 'Invalid Username or password' };
          default:
            return { error: 'Oops! Something went wrong, please try again' };
        }
      } else {
        router.push('/dashboard-user');
      }
      return { success: 'Successfully logged in' };
    } catch (error) {
      console.error('error logging in', error);
      return { error: 'Error logging in' };
    }
  }

  const FormField = useMemo(
    () => (
      <div className="m-0 flex flex-col gap-2 pb-2">
        <InputField
          control={form.control}
          name="email"
          label="Email"
          placeholder="name@example.com"
          type="text"
          icon={iconEmail}
        />
        <InputField
          control={form.control}
          name="password"
          label="Password"
          placeholder="password"
          type="password"
          icon={iconPassword}
        />
      </div>
    ),
    [form.control],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onAuthenticate)} className="space-y-4">
        {FormField}
        <AuthButton type="submit" variant="default" title="Sign in" />
        <Divider />
      </form>
    </Form>
  );
};

export default React.memo(LoginForm);
