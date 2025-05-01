import React from 'react';
import { GalleryVerticalEnd } from 'lucide-react';

const Header = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col items-center gap-1 pb-4">
      <GalleryVerticalEnd className="h-[2rem] w-[2rem]" />
      <h2 className="text-color-text text-2xl font-semibold">{title}</h2>
    </div>
  );
};

export default Header;
