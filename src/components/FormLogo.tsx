import React from 'react';
import { GalleryVerticalEnd } from 'lucide-react';
import Link from 'next/link';

const FormLogo = () => {
  return (
    <Link
      className="bg-card-foreground mb-2 flex h-20 w-full items-center justify-center rounded-md p-4 md:h-40 md:items-end"
      href="/"
    >
      <div className="flex flex-row items-center gap-2 text-white md:w-40 md:flex-col md:gap-0">
        <GalleryVerticalEnd className="h-[2rem] w-[2rem]" />
        <span className="text-[1.5rem]">Form</span>
      </div>
    </Link>
  );
};

export default FormLogo;

export function Logo() {
  return (
    <div className="flex flex-row items-center gap-2 md:w-40 md:flex-row md:items-center md:gap-2">
      <GalleryVerticalEnd className="h-[2rem] w-[2rem]" />
      <span className="text-[1.5rem]">Form</span>
    </div>
  );
}
