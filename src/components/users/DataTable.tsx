'use client';
import React, { useEffect, useState } from 'react';
import {
  buildHeaderGroups,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table';
import { columns } from '@/components/users/Columns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import useUserAction from '@/hooks/useUserAction';
import { getUsers } from '@/actions/user';
import { Loader2 } from 'lucide-react';

export function DataTable<TData, TValue>({ idKey = 'id' }: { idKey?: string }) {
  const [data, setData] = useState<TData[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { setSelectedUsersIds, shouldRefresh } = useUserAction();

  const table = useReactTable({
    data,
    columns: columns as ColumnDef<TData, TValue>[],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 8,
        pageIndex: 0,
      },
    },
    state: {
      sorting,
      rowSelection,
    },
  });

  useEffect(() => {
    const selectedId = table.getSelectedRowModel().rows.map(row => (row.original as any)[idKey]);
    setSelectedUsersIds(selectedId);
    console.log(selectedId);
  }, [rowSelection, table, setSelectedUsersIds, idKey]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const users = await getUsers();
      if (users) {
        setData(users as TData[]);
        table.resetRowSelection();
      } else {
        console.error('No users found');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (shouldRefresh) {
      fetchUsers();
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="md: rounded-lg bg-gray-50 p-2 pt-0">
          {isLoading && (
            <div className="flex justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
            </div>
          )}
          <Table className="hidden min-w-full md:table">
            <TableHeader className="rounded-lg text-left text-sm font-normal">
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <TableHead key={header.id} className="px-3 py-5">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="bg-white">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className="w-full border-b py-3 text-sm"
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id} className="h-16 px-3 py-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    {isLoading ? 'Loading data...' : 'No results'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-center space-x-2 py-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="cursor-pointer"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="cursor-pointer"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
