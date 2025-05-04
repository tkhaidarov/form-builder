import { CheckIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { Badge } from '@/components/ui/badge';

export default function UserStatus({ status }: { status: boolean }) {
  return (
    <span>
      {!status && (
        <Badge variant="destructive">
          Blocked <LockClosedIcon />{' '}
        </Badge>
      )}
      {status && (
        <Badge className="bg-green-500">
          Active <CheckIcon />{' '}
        </Badge>
      )}
    </span>
  );
}
