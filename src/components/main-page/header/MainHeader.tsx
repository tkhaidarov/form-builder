'use client';
import React, { useEffect, useState } from 'react';
import { Logo } from '@/components/FormLogo';
import { Search } from '@/components/Tools';
import AvatarUser from '@/components/main-page/AvatarUser';
import { Button } from '@/components/ui/button';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { signOut, signIn, useSession } from 'next-auth/react';
import Link from 'next/link';

const MainHeader = () => {
  const session = useSession();
  console.log(session);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <header>
      <div className="flex items-center justify-between px-10 py-4">
        <Logo />
        <div className="w-2xl">
          <Search placeholder="Search" />
        </div>
        <div className="flex gap-20">
          <Tabs defaultValue={theme}>
            <TabsList className="gap-3">
              <TabsTrigger value="light" onClick={() => setTheme('light')}>
                <Sun className="w-6" />
              </TabsTrigger>
              <TabsTrigger value="system" onClick={() => setTheme('system')}>
                <Monitor className="w-6" />
              </TabsTrigger>
              <TabsTrigger value="dark" onClick={() => setTheme('dark')}>
                <Moon className="w-6" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex gap-3">
            <AvatarUser />
            {session?.data ? (
              <Link href="#" onClick={() => signOut({ callbackUrl: '/' })}>
                Sign Out
              </Link>
            ) : (
              <Link href="#">Sign In</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
