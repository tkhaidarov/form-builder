'use client';
import { Text } from 'lucide-react';
import {
  FormElement,
  FormElementInstance,
  TElementsType,
  TSubmitFunction,
} from '@/components/dashboard-user/FormElement';
import { Label } from '@/components/ui/label';
import {
  TPropertiesSchemaParagraphField,
  propertiesSchemaParagraphField,
} from '@/definitions/schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import useDesigner from '@/hooks/useDesigner';
import { Form } from '@/components/ui/form';
import { TextAreaField } from '@/components/ui/InputField';
const type: TElementsType = 'ParagraphField';
const additionalAttributes = {
  text: 'text here',
};

export const ParagraphFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    additionalAttributes,
  }),
  designerBtnElement: {
    icon: Text,
    label: 'Paragraph field',
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
  const { text } = element.additionalAttributes;
  return (
    <div className="flex w-full flex-col gap-2">
      <Label className="text-muted-foreground font-normal">Paragraph Field</Label>
      <p>{text}</p>
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
  const { text } = element.additionalAttributes;
  return <p>{text}</p>;
}

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as TCustomInstance;
  const { updateElement } = useDesigner();
  const defaultValues = {
    text: element.additionalAttributes.title,
  };

  const form = useForm<TPropertiesSchemaParagraphField>({
    resolver: zodResolver(propertiesSchemaParagraphField),
    mode: 'onBlur',
    defaultValues,
  });
  useEffect(() => {
    form.reset(element.additionalAttributes);
  }, [element, form]);
  function applyChanges(values: TPropertiesSchemaParagraphField) {
    const { text } = values;

    updateElement(element.id, {
      ...element,
      additionalAttributes: {
        text,
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
        <TextAreaField
          control={form.control}
          name="text"
          label="Text"
          placeholder="write something..."
          type="text"
        />
      </form>
    </Form>
  );
}
