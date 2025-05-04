import React, { Suspense } from 'react';
import { CardsSkeleton } from '@/components/Skeletons';
import { UserDashboardStatsCard } from '@/components/dashboard/Cards';
import { Separator } from '@/components/ui/separator';
import CreateForm from '@/components/dashboard-user/CreateForm';
import { auth } from '@/auth';
import FormCards from '@/components/dashboard-user/FormCards';
import { FormCardSkeleton } from '@/components/Skeletons';

const Page = async () => {
  const session = await auth();
  console.log(session);
  return (
    <div className="container mx-auto px-4 pt-16 sm:px-0">
      <h1 className="mb-4 text-xl md:text-2xl">
        Hey, {session && `${session?.user.name}`}! Welcome to your dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <UserDashboardStatsCard />
        </Suspense>
      </div>
      <Separator className="my-6" />
      <h2 className="col-span-2 text-4xl font-medium">Your Forms</h2>
      <Separator className="my-6" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CreateForm />
        <Suspense
          fallback={[1, 2, 3].map(item => (
            <FormCardSkeleton key={item} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
