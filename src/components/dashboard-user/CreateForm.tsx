import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { createFormIcon } from '@/definitions/constants';
import { Button } from '../ui/button';
import DialogFormFields from '@/components/dashboard-user/DialogFormField';

const CreateForm = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="hover:border-primary flex h-48 flex-col items-center justify-center gap-4 border border-dashed hover:cursor-pointer"
        >
          {createFormIcon} Create new form
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a form</DialogTitle>
          <DialogDescription>
            Create a new custom form for collecting data from your users.
          </DialogDescription>
        </DialogHeader>
        <DialogFormFields />
      </DialogContent>
    </Dialog>
  );
};

export default CreateForm;
