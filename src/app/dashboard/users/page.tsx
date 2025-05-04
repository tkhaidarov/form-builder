import Tools from '@/components/Tools';
import { Suspense } from 'react';
import { UsersTableSkeleton } from '@/components/Skeletons';
import { DataTable } from '@/components/users/DataTable';
import { columns } from '@/components/users/Columns';
import { getUsers } from '@/actions/user';

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const users = await getUsers();
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Users</h1>
      </div>
      <div>
        <Tools />
      </div>
      <Suspense key={query + currentPage} fallback={<UsersTableSkeleton />}>
        <DataTable />
        {/*query={query} currentPage={currentPage}*/}
      </Suspense>
    </div>
  );
}
