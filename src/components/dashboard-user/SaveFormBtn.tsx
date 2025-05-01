import React from 'react';
import { Button } from '@/components/ui/button';
import { saveIcon } from '@/definitions/constants';

const SaveFormBtn = () => {
  return <Button variant="outline">{saveIcon} Save</Button>;
};

export default SaveFormBtn;
