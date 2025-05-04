import React from 'react';

export interface IInputProps {
  id?: string;
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  icon?: React.ReactNode;
}

export interface ISignProps {
  title: string;
  href: string;
  linkText: string;
}
export interface IAuthButtonProps {
  icon?: React.ReactNode;
  type?: 'button' | 'reset' | 'submit' | undefined;
  variant: 'link' | 'outline' | 'default' | 'destructive' | 'secondary' | 'ghost' | null;
  title?: string;
}
export type TToolButton = {
  icon?: React.ReactNode;
  onClickAction: () => void;
  disabled: boolean;
  title: string;
};
export interface ICardProps {
  title: string;
  value: number | string;
  type:
    | 'users'
    | 'blockedUsers'
    | 'superusers'
    | 'activeUsers'
    | 'view'
    | 'calculator'
    | 'mousePointer'
    | 'star';
}
