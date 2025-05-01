import MainHeader from '@/components/main-page/header/MainHeader';
import MainBody from '@/components/main-page/main/MainBody';
import { useSession } from 'next-auth/react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();
  // if (!session) redirect('/login');
  return (
    <div>
      <MainHeader />
    </div>
  );
}
