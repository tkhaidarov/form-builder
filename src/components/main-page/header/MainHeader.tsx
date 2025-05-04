'use client';
import React, { useEffect, useState } from 'react';
import { Logo } from '@/components/FormLogo';
import { Search } from '@/components/Tools';
import AvatarUser from '@/components/main-page/AvatarUser';
import { signOut, signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import ThemeSwitcher from '@/components/ThemeSwitcher';

const MainHeader = () => {
  const session = useSession();
  console.log(session);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <header>
      <nav className="flex items-center justify-between gap-3 border-b px-10 py-4">
        <Logo />
        <div className="flex items-center gap-3">
          <ThemeSwitcher />
          <div className="flex items-center gap-3">
            <AvatarUser />
            {session?.data ? (
              <Link href="#" onClick={() => signOut({ redirectTo: '/' })}>
                Sign Out
              </Link>
            ) : (
              <Link href="#">Sign In</Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default MainHeader;
