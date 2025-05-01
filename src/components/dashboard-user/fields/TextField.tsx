'use client';
import { Inbox, WholeWord } from 'lucide-react';
import {
  FormElement,
  FormElementInstance,
  TElementsType,
} from '@/components/dashboard-user/FormElement';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
const type: TElementsType = 'TextField';
const additionalAttributes = {
  label: 'Text field',
  helperText: 'Helper text',
  required: false,
  placeHolder: 'write something...',
};

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    additionalAttributes,
  }),
  designerBtnElement: {
    icon: WholeWord,
    label: 'Text field',
  },
  designerComponent: DesignerComponent,
  formComponent: () => <div>form component</div>,
  propertiesComponent: () => <div>properties component</div>,
};

type TCustomInstance = FormElementInstance & {
  additionalAttributes: typeof additionalAttributes;
};

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as TCustomInstance;
  const { label, required, placeholder, helperText } = element.additionalAttributes;
  return (
    <div className="flex w-full flex-col gap-2">
      <Label>
        {label}
        {required && '*'}
      </Label>
      <Input readOnly disabled placeholder={placeholder} />
      {helperText && <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>}
    </div>
  );
}
