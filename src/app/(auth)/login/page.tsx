import React from 'react';
import LoginForm from '@/components/auth/LoginForm';
import Header from '@/components/auth/Header';
import SignPrompt from '@/components/auth/SignPrompt';
import OAuthSignIn from '@/components/auth/OAuthSignIn';
import { gitHubIcon, googleIcon } from '@/definitions/constants';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

const Page = async () => {
  const session = await auth();
  if (session) redirect('/dashboard-user');
  return (
    <>
      <Header title="Sign in to Form" />
      <LoginForm />
      <div className="grid gap-4 sm:grid-cols-2">
        <OAuthSignIn authProvider="google" icon={googleIcon} title="Google" />
        <OAuthSignIn authProvider="github" icon={gitHubIcon} title="GitHub" />
      </div>
      <SignPrompt title="Don't have an account?" href="/register" linkText="Sign up" />
    </>
  );
};

export default Page;
