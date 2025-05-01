'use client';
import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { validationFormSchema, TFormData } from '@/definitions/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { InputField } from '@/components/ui/InputField';
import Divider from '@/components/auth/Divider';
import AuthButton from '@/components/auth/OAuthButton';
import { iconEmail, iconPassword, userCircleIcon } from '@/definitions/constants';

const RegisterForm = () => {
  const router = useRouter();
  const defaultValues = useMemo(
    () => ({
      name: '',
      email: '',
      password: '',
    }),
    [],
  );
  const form = useForm<TFormData>({
    resolver: zodResolver(validationFormSchema),
    defaultValues,
  });
  const onSubmit = useCallback(async (data: TFormData) => {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    });
    if (response.ok) {
      router.push('/login');
    } else {
      console.error('Oops, something went wrong!');
    }
  }, []);

  const FormField = useMemo(
    () => (
      <div className="m-0 flex flex-col gap-2 pb-2">
        <InputField
          control={form.control}
          name="name"
          label="Name"
          placeholder="Leo"
          type="text"
          icon={userCircleIcon}
        />
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
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {FormField}
          <AuthButton type="submit" variant="default" title="Sign up" />
          <Divider />
        </form>
      </Form>
    </>
  );
};

export default React.memo(RegisterForm);
