'use client';
import { AlignVerticalSpaceAround } from 'lucide-react';
import {
  FormElement,
  FormElementInstance,
  TElementsType,
  TSubmitFunction,
} from '@/components/dashboard-user/FormElement';
import { Label } from '@/components/ui/label';
import { TPropertiesSchemaSpacerField, propertiesSchemaSpacerField } from '@/definitions/schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import useDesigner from '@/hooks/useDesigner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { InputField } from '@/components/ui/InputField';
import { Slider } from '@/components/ui/slider';
const type: TElementsType = 'SpacerField';
const additionalAttributes = {
  height: 20,
};

export const SpacerFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    additionalAttributes,
  }),
  designerBtnElement: {
    icon: AlignVerticalSpaceAround,
    label: 'Spacer field',
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
  const { height } = element.additionalAttributes;
  return (
    <div className="flex w-full flex-col items-center gap-2">
      <Label className="text-muted-foreground font-normal">Spacer Field: {height} px</Label>
      <AlignVerticalSpaceAround />
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
  const { height } = element.additionalAttributes;
  return <div style={{ height, width: '100%' }}></div>;
}

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as TCustomInstance;
  const { updateElement } = useDesigner();
  const defaultValues = {
    height: element.additionalAttributes.height,
  };

  const form = useForm<TPropertiesSchemaSpacerField>({
    resolver: zodResolver(propertiesSchemaSpacerField),
    mode: 'onBlur',
    defaultValues,
  });
  useEffect(() => {
    form.reset(element.additionalAttributes);
  }, [element, form]);
  function applyChanges(values: TPropertiesSchemaSpacerField) {
    const { height } = values;

    updateElement(element.id, {
      ...element,
      additionalAttributes: {
        height,
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
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Height (px): {form.watch('height')}</FormLabel>
              <FormControl>
                <Slider
                  defaultValue={[field.value]}
                  min={5}
                  max={100}
                  step={1}
                  onValueChange={value => {
                    field.onChange(value[0]);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
