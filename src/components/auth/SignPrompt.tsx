import Link from 'next/link';
import { ISignProps } from '@/definitions/definitions';
import React from 'react';

const SignPrompt: React.FC<ISignProps> = ({ title, href, linkText }) => {
  return (
    <p className="text-muted-foreground text-center text-[0.9rem]">
      {title}{' '}
      <Link href={href} className="text-card-foreground underline underline-offset-5 transition">
        {' '}
        {linkText}
      </Link>
    </p>
  );
};

export default SignPrompt;
