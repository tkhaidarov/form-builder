// import Pagination from '@/app/ui/invoices/pagination';
import Tools from '@/components/Tools';
// import Table from '@/app/ui/invoices/table';
// import { InvoicesTableSkeleton } from '@/components/Skeletons';
import { Suspense } from 'react';
import { UsersTableSkeleton } from '@/components/Skeletons';
import { DataTable } from '@/components/users/DataTable';
import { users } from '@/definitions/constants';
import { TUsers } from '@/definitions/schemas';
import { columns } from '@/components/users/Columns';

async function getData(): Promise<TUsers[]> {
  return users;
}

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
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
        <DataTable columns={columns} data={users} />
        {/*query={query} currentPage={currentPage}*/}
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
}
