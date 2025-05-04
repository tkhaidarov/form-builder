'use client';
import { CalendarDays } from 'lucide-react';
import {
  FormElement,
  FormElementInstance,
  TElementsType,
  TSubmitFunction,
} from '@/components/dashboard-user/FormElement';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { TPropertiesSchemaDate, propertiesSchemaDate } from '@/definitions/schemas';
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
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
const type: TElementsType = 'DateField';
const additionalAttributes = {
  label: 'Date field',
  helperText: 'Pick a date',
  required: false,
};

export const DateFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    additionalAttributes,
  }),
  designerBtnElement: {
    icon: CalendarDays,
    label: 'Date field',
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
  const { label, required, placeholder, helperText } = element.additionalAttributes;
  return (
    <div className="flex w-full flex-col gap-2">
      <Label className="text-muted-foreground font-normal">
        {label}
        {required && '*'}
      </Label>
      <Button variant="outline" className="w-full justify-start text-left font-normal">
        <CalendarDays />
        <span>Pick a date</span>
      </Button>
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
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : undefined,
  );
  const [error, setError] = useState(false);
  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);
  const element = elementInstance as TCustomInstance;
  const { label, required, placeholder, helperText } = element.additionalAttributes;
  return (
    <div className="flex w-full flex-col gap-2">
      <Label className={cn(error && 'text-destructive')}>
        {label}
        {required && '*'}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground',
              error && 'text-destructive',
            )}
          >
            <CalendarDays />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={date => {
              setDate(date);
              if (!submitValue) return;
              const value = date?.toUTCString() || '';
              const valid = DateFieldFormElement.validate(element, value);
              setError(!valid);
              submitValue(element.id, value);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
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
  };

  const form = useForm<TPropertiesSchemaDate>({
    resolver: zodResolver(propertiesSchemaDate),
    mode: 'onBlur',
    defaultValues,
  });
  useEffect(() => {
    form.reset(element.additionalAttributes);
  }, [element, form]);
  function applyChanges(values: TPropertiesSchemaDate) {
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
