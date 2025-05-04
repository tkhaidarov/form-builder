'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import useUserAction from '@/hooks/useUserAction';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Lock, Unlock, Trash2, UserCog, User } from 'lucide-react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { TToolButton } from '@/definitions/definitions';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function Tools() {
  return (
    <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
      <Search placeholder="Search users..." />
      <ToolButtons />
    </div>
  );
}

export function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(query: string) {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('query', query);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
    console.log(query);
  }

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <Input
        className="pl-10"
        placeholder={placeholder}
        onChange={e => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}

export function ToolButtons() {
  const { selectedUsersIds, isProcessing, blockUser } = useUserAction();

  return (
    <>
      <ToolButton
        onClickAction={blockUser}
        disabled={isProcessing || selectedUsersIds.length === 0}
        icon={<Unlock />}
        title="Unblock"
      />
      {/*<ToolButton icon={<Lock />} title="Block" />*/}
      {/*<ToolButton icon={<UserCog />} title="Add to admin" />*/}
      {/*<ToolButton icon={<User />} title="Remove from admin" />*/}
      {/*<ToolButton icon={<Trash2 />} title="Delete" />*/}
    </>
  );
}

export function ToolButton({ title, icon, onClickAction, disabled }: TToolButton) {
  return (
    <Button
      onClick={onClickAction}
      disabled={disabled}
      variant="outline"
      className="cursor-pointer border-dashed"
    >
      {icon}
      {title}
    </Button>
  );
}
