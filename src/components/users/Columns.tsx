'use client';
import { ColumnDef } from '@tanstack/react-table';
import { TUsers } from '@/definitions/schemas';
import UserStatus from '@/components/users/Status';
import LastSeen from '@/components/LastSeen';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export const columns: ColumnDef<TUsers>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <div className="ml-[-12px]">
          <Button
            className="cursor-pointer"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Email
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue<boolean>();
      return <UserStatus status={status} />;
    },
  },
  {
    accessorKey: 'created_at',
    header: 'Last Seen',
    cell: ({ getValue }) => {
      const date = getValue<Date>();
      return <LastSeen date={date} />;
    },
  },
];
