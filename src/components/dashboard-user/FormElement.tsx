import React from 'react';
import { TextFieldFormElement } from '@/components/dashboard-user/fields/TextField';
import { TitleFieldFormElement } from '@/components/dashboard-user/fields/TitleField';
import { SubTitleFieldFormElement } from '@/components/dashboard-user/fields/SubTitleField';
import { ParagraphFieldFormElement } from '@/components/dashboard-user/fields/ParagraphField';
import { SeparatorFormElement } from '@/components/dashboard-user/fields/SeparatorField';
import { SpacerFieldFormElement } from '@/components/dashboard-user/fields/SpacerField';
import { NumberFieldFormElement } from '@/components/dashboard-user/fields/NumberField';
import { TextAreaFieldFormElement } from '@/components/dashboard-user/fields/TextAreaField';
import { DateFieldFormElement } from '@/components/dashboard-user/fields/DateField';
import { SelectFieldFormElement } from '@/components/dashboard-user/fields/SelectField';
import { CheckboxFormElement } from '@/components/dashboard-user/fields/CheckboxField';

export type TElementsType =
  | 'TextField'
  | 'TitleField'
  | 'SubTitleField'
  | 'ParagraphField'
  | 'SeparatorField'
  | 'SpacerField'
  | 'NumberField'
  | 'TextAreaField'
  | 'DateField'
  | 'SelectField'
  | 'CheckboxField';
export type TSubmitFunction = (key: string, value: string) => void;
export type FormElement = {
  type: TElementsType;
  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    submitValue?: TSubmitFunction;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  designerBtnElement: {
    icon: React.ElementType;
    label: string;
  };
  construct: (id: string) => FormElementInstance;
  validate: (formElement: FormElementInstance, currentValue: string) => boolean;
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
  TitleField: TitleFieldFormElement,
  SubTitleField: SubTitleFieldFormElement,
  ParagraphField: ParagraphFieldFormElement,
  SeparatorField: SeparatorFormElement,
  SpacerField: SpacerFieldFormElement,
  NumberField: NumberFieldFormElement,
  TextAreaField: TextAreaFieldFormElement,
  DateField: DateFieldFormElement,
  SelectField: SelectFieldFormElement,
  CheckboxField: CheckboxFormElement,
};
