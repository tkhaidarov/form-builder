import React from 'react';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';
import FormLogo from '@/components/FormLogo';
import NavLinks from '@/components/dashboard/NavLinks';
const SideNavigation = () => {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <FormLogo />
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-y-2 md:space-x-0">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
        // action={async () => {
        //   'use server';
        //   await signOut({ redirectTo: '/' });
        // }}
        >
          <button className="flex h-[48px] w-full grow cursor-pointer items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm transition hover:bg-gray-200 hover:text-gray-700 md:flex-none md:justify-start md:p-2 md:px-3">
            <ArrowLeftStartOnRectangleIcon className="w-6" />
            <p className="hidden md:block">Sign Out</p>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SideNavigation;
