import Link from 'next/link';
import { Plus } from 'lucide-react';
import React from 'react';

export function CreateForm({ id }: { id: string }) {
  return (
    <Link
      href={`/form/${id}/create`}
      className="flex h-32 w-[170px] cursor-pointer items-center justify-center rounded-md border-[1.5px] bg-gray-50 transition hover:border-gray-400"
    >
      <Plus className="h-20 w-20" />
    </Link>
  );
}
