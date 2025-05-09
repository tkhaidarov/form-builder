import { latestUsers } from '@/definitions/constants';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default /*async*/ function LatestUsers() {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className="mb-4 text-xl md:text-2xl">Latest Users</h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {
          <div className="bg-white px-6">
            {latestUsers.map((user, i) => {
              return (
                <div
                  key={user.id}
                  className={clsx('flex flex-row items-center justify-between py-4', {
                    'border-t': i !== 0,
                  })}
                >
                  <div className="flex items-center">
                    {/*<Image*/}
                    {/*  src={invoice.image_url}*/}
                    {/*  alt={`${invoice.name}'s profile picture`}*/}
                    {/*  className="mr-4 rounded-full"*/}
                    {/*  width={32}*/}
                    {/*  height={32}*/}
                    {/*/>*/}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold md:text-base">{user.name}</p>
                      <p className="hidden text-sm text-gray-500 sm:block">{user.email}</p>
                    </div>
                  </div>
                  <p className="truncate text-sm font-medium md:text-base">{user.created_at}</p>
                </div>
              );
            })}
          </div>
        }
        <div className="flex items-center pt-6 pb-2">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
