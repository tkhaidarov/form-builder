'use client';
import React from 'react';
import MainHeader from '@/components/main-page/header/MainHeader';
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-background flex h-screen max-h-screen min-h-screen min-w-full flex-col">
      <MainHeader />
      <main className="flex w-full flex-grow">{children}</main>
    </div>
  );
};

export default Layout;
