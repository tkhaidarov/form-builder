import React from 'react';
import RegisterForm from '@/components/auth/RegisterForm';
import Header from '@/components/auth/Header';
import OAuthSignIn from '@/components/auth/OAuthSignIn';
import { gitHubIcon, googleIcon } from '@/definitions/constants';
import SignPrompt from '@/components/auth/SignPrompt';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const Page = async () => {
  const session = await auth();
  if (session) redirect('/dashboard-user');
  return (
    <>
      <Header title="Welcome to Form" />
      <RegisterForm />
      <div className="grid gap-4 sm:grid-cols-2">
        <OAuthSignIn authProvider="google" icon={googleIcon} title="Google" />
        <OAuthSignIn authProvider="github" icon={gitHubIcon} title="GitHub" />
      </div>
      <SignPrompt title="Already have an account?" href="/login" linkText="Sign in" />
    </>
  );
};

export default Page;
