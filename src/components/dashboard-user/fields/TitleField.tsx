'use client';
import { Heading } from 'lucide-react';
import {
  FormElement,
  FormElementInstance,
  TElementsType,
  TSubmitFunction,
} from '@/components/dashboard-user/FormElement';
import { Label } from '@/components/ui/label';
import { TPropertiesSchemaTitleField, propertiesSchemaTitleField } from '@/definitions/schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import useDesigner from '@/hooks/useDesigner';
import { Form } from '@/components/ui/form';
import { InputField } from '@/components/ui/InputField';
const type: TElementsType = 'TitleField';
const additionalAttributes = {
  title: 'Title field',
};

export const TitleFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    additionalAttributes,
  }),
  designerBtnElement: {
    icon: Heading,
    label: 'Title field',
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: () => true,
};

type TCustomInstance = FormElementInstance & {
  additionalAttributes: typeof additionalAttributes;
};
function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as TCustomInstance;
  const { title } = element.additionalAttributes;
  return (
    <div className="flex w-full flex-col gap-2">
      <Label className="text-muted-foreground font-normal">Title Field</Label>
      <p className="text-xl">{title}</p>
    </div>
  );
}

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
  submitValue?: TSubmitFunction;
}) {
  const element = elementInstance as TCustomInstance;
  const { title } = element.additionalAttributes;
  return <p className="text-xl">{title}</p>;
}

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as TCustomInstance;
  const { updateElement } = useDesigner();
  const defaultValues = {
    title: element.additionalAttributes.title,
  };

  const form = useForm<TPropertiesSchemaTitleField>({
    resolver: zodResolver(propertiesSchemaTitleField),
    mode: 'onBlur',
    defaultValues,
  });
  useEffect(() => {
    form.reset(element.additionalAttributes);
  }, [element, form]);
  function applyChanges(values: TPropertiesSchemaTitleField) {
    const { title } = values;

    updateElement(element.id, {
      ...element,
      additionalAttributes: {
        title,
      },
    });
  }
  return (
    <Form {...form}>
      <form
        className="space-y-3"
        onSubmit={e => e.preventDefault()}
        onBlur={form.handleSubmit(applyChanges)}
      >
        <InputField
          control={form.control}
          name="title"
          label="Title"
          placeholder="write something..."
          type="text"
        />
      </form>
    </Form>
  );
}
