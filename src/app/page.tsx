import MainHeader from '@/components/main-page/header/MainHeader';
import MainBody from '@/components/main-page/main/MainBody';
import { useSession } from 'next-auth/react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { RedirectButton } from '@/components/RedirectButton';

export default async function Home() {
  // const session = auth();
  // if (!session) {
  //   redirect('/');
  // } else {
  //   redirect('/dashboard-user');
  // }
  return (
    <div className="h-full w-full">
      <MainHeader />
      <main className="flex h-full w-full flex-col items-center justify-center">
        <RedirectButton />
      </main>
    </div>
  );
}
