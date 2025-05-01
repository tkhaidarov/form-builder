import React from 'react';
import { Card } from '@/components/ui/card';
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <Card className="relative mx-auto flex w-full max-w-[400px] flex-col p-6 pt-10 pb-8 shadow-2xl">
        {children}
      </Card>
    </main>
  );
};

export default Layout;
