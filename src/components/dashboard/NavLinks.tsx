'use client';
import React from 'react';
import Link from 'next/link';
import { links } from '@/definitions/constants';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

const NavLinks = () => {
  const pathname = usePathname();
  return (
    <>
      {links.map(link => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm transition hover:bg-gray-200 hover:text-gray-700 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'text-color-text bg-gray-200': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
};

export default NavLinks;
