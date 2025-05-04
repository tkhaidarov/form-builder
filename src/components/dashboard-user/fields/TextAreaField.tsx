'use client';
import { TextSelect } from 'lucide-react';
import {
  FormElement,
  FormElementInstance,
  TElementsType,
  TSubmitFunction,
} from '@/components/dashboard-user/FormElement';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { TPropertiesSchemaTextArea, propertiesSchemaTextArea } from '@/definitions/schemas';
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
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
const type: TElementsType = 'TextAreaField';
const additionalAttributes = {
  label: 'Text area',
  helperText: 'Helper text',
  required: false,
  placeholder: 'write something...',
  rows: 3,
};

export const TextAreaFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    additionalAttributes,
  }),
  designerBtnElement: {
    icon: TextSelect,
    label: 'TextArea field',
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (formElement: FormElementInstance, currentValue: string): boolean => {
    const element = formElement as TCustomInstance;
    if (element.additionalAttributes.required) {
      return currentValue.length > 0;
    }
    return true;
  },
};

type TCustomInstance = FormElementInstance & {
  additionalAttributes: typeof additionalAttributes;
};
function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as TCustomInstance;
  const { label, required, placeholder, helperText, rows } = element.additionalAttributes;
  return (
    <div className="flex w-full flex-col gap-1">
      <Label className="text-muted-foreground font-normal">
        {label}
        {required && '*'}
      </Label>
      <Textarea readOnly placeholder={placeholder} />
      {helperText && <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>}
    </div>
  );
}

function FormComponent({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValue,
}: {
  elementInstance: FormElementInstance;
  submitValue?: TSubmitFunction;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const [value, setValue] = useState(defaultValue || '');
  const [error, setError] = useState(false);
  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);
  const element = elementInstance as TCustomInstance;
  const { label, required, placeholder, helperText, rows } = element.additionalAttributes;
  return (
    <div className="flex w-full flex-col gap-2">
      <Label className={cn(error && 'text-destructive')}>
        {label}
        {required && '*'}
      </Label>
      <Textarea
        rows={rows}
        className={cn(error && 'border-destructive')}
        placeholder={placeholder}
        onChange={e => setValue(e.target.value)}
        onBlur={e => {
          if (!submitValue) return;
          const valid = TextAreaFieldFormElement.validate(element, e.target.value);
          setError(!valid);
          if (!valid) return;
          submitValue(element.id, e.target.value);
        }}
        value={value}
      />
      {helperText && (
        <p className={cn('text-muted-foreground text-[0.8rem]', error && 'text-destructive')}>
          {helperText}
        </p>
      )}
    </div>
  );
}

function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as TCustomInstance;
  const { updateElement } = useDesigner();
  const defaultValues = {
    label: element.additionalAttributes.label,
    helperText: element.additionalAttributes.helperText,
    required: element.additionalAttributes.required,
    placeholder: element.additionalAttributes.placeholder,
    rows: element.additionalAttributes.rows,
  };

  const form = useForm<TPropertiesSchemaTextArea>({
    resolver: zodResolver(propertiesSchemaTextArea),
    mode: 'onBlur',
    defaultValues,
  });
  useEffect(() => {
    form.reset(element.additionalAttributes);
  }, [element, form]);
  function applyChanges(values: TPropertiesSchemaTextArea) {
    const { label, helperText, required, placeholder, rows } = values;

    updateElement(element.id, {
      ...element,
      additionalAttributes: {
        label,
        helperText,
        required,
        placeholder,
        rows,
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
          name="label"
          label="Label"
          placeholder="write something..."
          type="text"
        />
        <InputField
          control={form.control}
          name="placeholder"
          label="Placeholder"
          placeholder="write something..."
          type="text"
        />
        <InputField
          control={form.control}
          name="helperText"
          label="Helper text"
          placeholder="write something..."
          type="text"
        />
        <FormField
          control={form.control}
          name="rows"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Rows {form.watch('rows')}</FormLabel>
              <FormControl>
                <Slider
                  defaultValue={[field.value]}
                  min={1}
                  max={10}
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

        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex flex-row justify-between rounded-md">
              <FormLabel>Required</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
