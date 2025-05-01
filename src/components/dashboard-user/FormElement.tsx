import React from 'react';
import { TextFieldFormElement } from '@/components/dashboard-user/fields/TextField';

export type TElementsType = 'TextField';
export type FormElement = {
  type: TElementsType;
  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  formComponent: React.FC;
  propertiesComponent: React.FC;
  designerBtnElement: {
    icon: React.ElementType;
    label: string;
  };
  construct: (id: string) => FormElementInstance;
};

export type FormElementInstance = {
  id: string;
  type: TElementsType;
  additionalAttributes?: Record<string, any>;
};

type TFormElementsType = {
  [key in TElementsType]: FormElement;
};
export const FormElements: TFormElementsType = {
  TextField: TextFieldFormElement,
};
