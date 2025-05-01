import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function UserStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx('inline-flex items-center rounded-full px-2 py-1 text-xs', {
        'bg-destructive text-white': status === 'blocked',
        'bg-green-500 text-white': status === 'active',
      })}
    >
      {status === 'blocked' ? (
        <>
          Blocked
          <ClockIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'active' ? (
        <>
          Active
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
