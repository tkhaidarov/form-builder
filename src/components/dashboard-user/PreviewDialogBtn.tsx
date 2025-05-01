import React from 'react';
import { Button } from '@/components/ui/button';
import { viewIcon } from '@/definitions/constants';

const PreviewDialogBtn = () => {
  return <Button variant="outline">{viewIcon} Preview</Button>;
};

export default PreviewDialogBtn;
