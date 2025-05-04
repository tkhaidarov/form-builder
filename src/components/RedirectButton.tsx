'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export function RedirectButton() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleRedirect = () => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else {
      router.push('/dashboard-user');
    }
  };

  return <Button onClick={handleRedirect}>Let's start</Button>;
}
