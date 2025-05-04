'use client';
import { SeparatorHorizontal } from 'lucide-react';
import {
  FormElement,
  FormElementInstance,
  TElementsType,
} from '@/components/dashboard-user/FormElement';
import { Label } from '@/components/ui/label';
import React from 'react';
import { Separator } from '@/components/ui/separator';

const type: TElementsType = 'SeparatorField';

export const SeparatorFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
  }),
  designerBtnElement: {
    icon: SeparatorHorizontal,
    label: 'Separator',
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: () => true,
};

function DesignerComponent() {
  return (
    <div className="flex w-full flex-col gap-2">
      <Label className="text-muted-foreground font-normal">Separator Field</Label>
      <Separator />
    </div>
  );
}

function FormComponent() {
  return <Separator />;
}

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  return <p>No properties for Separator element</p>;
}
