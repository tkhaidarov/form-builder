import React, { Suspense } from 'react';
import { CardsSkeleton, LatestUsersRowSkeleton, VisitChartSkeleton } from '@/components/Skeletons';
import { CardWrapper } from '@/components/dashboard/Cards';
import { VisitChart } from '@/components/dashboard/VisitChart';
import LatestUsers from '@/components/dashboard/LatestUsers';
const Page = () => {
  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl"> Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<VisitChartSkeleton />}>
          <VisitChart />
        </Suspense>
        <Suspense fallback={<LatestUsersRowSkeleton />}>
          <LatestUsers />
        </Suspense>
      </div>
    </main>
  );
};

export default Page;
