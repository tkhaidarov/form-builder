'use client';
import { Check } from 'lucide-react';
import {
  FormElement,
  FormElementInstance,
  TElementsType,
  TSubmitFunction,
} from '@/components/dashboard-user/FormElement';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { TPropertiesSchemaCheckbox, propertiesSchemaCheckbox } from '@/definitions/schemas';
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
import { Checkbox } from '@/components/ui/checkbox';
const type: TElementsType = 'CheckboxField';
const additionalAttributes = {
  label: 'Checkbox field',
  helperText: 'Helper text',
  required: false,
};

export const CheckboxFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    additionalAttributes,
  }),
  designerBtnElement: {
    icon: Check,
    label: 'Checkbox field',
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (formElement: FormElementInstance, currentValue: string): boolean => {
    const element = formElement as TCustomInstance;
    if (element.additionalAttributes.required) {
      return currentValue === 'true';
    }
    return true;
  },
};

type TCustomInstance = FormElementInstance & {
  additionalAttributes: typeof additionalAttributes;
};
function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as TCustomInstance;
  const { label, required, helperText } = element.additionalAttributes;
  const id = `checkbox-${element.id}`;
  return (
    <div className="items-top flex space-x-2">
      <Checkbox id={id}></Checkbox>
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor={id}>
          {label}
          {required && '*'}
        </Label>
        {helperText && <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>}
      </div>
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
  const [value, setValue] = useState<boolean>(defaultValue === 'true' ? true : false);
  const [error, setError] = useState(false);
  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);
  const element = elementInstance as TCustomInstance;
  const { label, required, placeholder, helperText } = element.additionalAttributes;
  const id = `checkbox-${element.id}`;
  return (
    <div className="items-top flex space-x-2">
      <Checkbox
        id={id}
        checked={value}
        className={cn(error && 'border-destructive')}
        onCheckedChange={checked => {
          let value = false;
          if (checked === true) value = true;
          setValue(value);
          if (!submitValue) return;
          const stringValue = value ? 'true' : 'false';
          const valid = CheckboxFormElement.validate(element, stringValue);
          setError(!valid);
          submitValue(element.id, stringValue);
        }}
      ></Checkbox>
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor={id} className={cn(error && 'border-destructive')}>
          {label}
          {required && '*'}
        </Label>
        {helperText && (
          <p className={cn('text-muted-foreground text-[0.8rem]', error && 'text-destructive')}>
            {helperText}
          </p>
        )}
      </div>
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
  };

  const form = useForm<TPropertiesSchemaCheckbox>({
    resolver: zodResolver(propertiesSchemaCheckbox),
    mode: 'onBlur',
    defaultValues,
  });
  useEffect(() => {
    form.reset(element.additionalAttributes);
  }, [element, form]);
  function applyChanges(values: TPropertiesSchemaCheckbox) {
    const { label, helperText, required } = values;

    updateElement(element.id, {
      ...element,
      additionalAttributes: {
        label,
        helperText,
        required,
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
          name="helperText"
          label="Helper text"
          placeholder="write something..."
          type="text"
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
