import { signIn } from '@/auth';
import AuthButton from '@/components/auth/OAuthButton';
import React from 'react';

const OAuthSignIn = ({
  authProvider,
  icon,
  title,
}: {
  authProvider: string;
  icon: React.ReactNode;
  title: string;
}) => {
  return (
    <form
      action={async () => {
        'use server';
        await signIn(`${authProvider}`);
      }}
    >
      <AuthButton type="submit" icon={icon} variant="outline" title={title} />
    </form>
  );
};
export default OAuthSignIn;
