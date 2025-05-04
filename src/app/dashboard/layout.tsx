'use client';
import React from 'react';
import SideNavigation from '@/components/dashboard/SideNavigation';
import ThemeSwitcher from '@/components/ThemeSwitcher';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="absolute right-10 bottom-3">
        <ThemeSwitcher />
      </div>

      <div className="w-full flex-none md:w-64">
        <SideNavigation />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
};

export default Layout;
