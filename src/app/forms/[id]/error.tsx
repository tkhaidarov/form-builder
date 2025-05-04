'use client';
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ErrorPage = ({ error }: { error: Error }) => {
  useEffect(() => console.error(error), [error]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 pt-8">
      <h2>Oops, something went wrong, please, try later</h2>
      <Button asChild>
        <Link href="/dashboard-user">Go to dashboard</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
