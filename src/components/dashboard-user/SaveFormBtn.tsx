import React, { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { loaderIcon, saveIcon } from '@/definitions/constants';
import useDesigner from '@/hooks/useDesigner';
import { updateFormContent } from '@/actions/actions';
import { toast } from 'sonner';

const SaveFormBtn = ({ id }: { id: string }) => {
  console.log('form', id);
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();
  const updataFormData = async () => {
    try {
      const jsonElement = JSON.stringify(elements);
      await updateFormContent(id, jsonElement);
      toast.success('Your form has been saved successfully');
    } catch (e) {
      toast.error('Saving form failed. Please try again later');
    }
  };
  return (
    <Button disabled={loading} onClick={() => startTransition(updataFormData)} variant="outline">
      {saveIcon} Save
      {loading && loaderIcon}
    </Button>
  );
};

export default SaveFormBtn;
