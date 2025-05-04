import React, { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { loaderIcon, publishIcon } from '@/definitions/constants';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { publishForm } from '@/actions/actions';
import { useRouter } from 'next/navigation';

const PublishFormBtn = ({ id }: { id: string }) => {
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  async function publishFormContent() {
    try {
      await publishForm(id);
      toast.success('Your form is now available');
      router.refresh();
    } catch (er) {
      toast.error('Something went wrong, please try again');
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>{publishIcon} Publish</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. After publishing you will not be able to edit this form.{' '}
            <br />
            <span className="font-medium">
              By publishing this form, you will make it available to the public and you will be able
              to collect submissions.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={e => {
              e.preventDefault();
              startTransition(publishFormContent);
            }}
          >
            Proceed {loading && loaderIcon}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PublishFormBtn;
