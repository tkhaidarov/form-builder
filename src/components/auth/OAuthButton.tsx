import React from 'react';
import { Button } from '@/components/ui/button';
import { IAuthButtonProps } from '@/definitions/definitions';

const AuthButton: React.FC<IAuthButtonProps> = ({ type, icon, variant, title }) => {
  return (
    <Button type={type} variant={variant} className="h-10 w-full cursor-pointer">
      {icon}
      {title}
    </Button>
  );
};

export default React.memo(AuthButton);
