'use client';
import { ChevronDownSquare, Plus, X } from 'lucide-react';
import {
  FormElement,
  FormElementInstance,
  TElementsType,
  TSubmitFunction,
} from '@/components/dashboard-user/FormElement';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { TPropertiesSchemaSelect, propertiesSchemaSelect } from '@/definitions/schemas';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
const type: TElementsType = 'SelectField';
const additionalAttributes = {
  label: 'Select field',
  helperText: 'Helper text',
  required: false,
  placeholder: 'select',
  options: [],
};

export const SelectFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    additionalAttributes,
  }),
  designerBtnElement: {
    icon: ChevronDownSquare,
    label: 'Select field',
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
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </Select>
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
  const { label, required, placeholder, helperText, options } = element.additionalAttributes;
  return (
    <div className="flex w-full flex-col gap-2">
      <Label className={cn(error && 'text-destructive')}>
        {label}
        {required && '*'}
      </Label>
      <Select
        defaultValue={value}
        onValueChange={value => {
          setValue(value);
          if (!submitValue) return;
          const valid = SelectFieldFormElement.validate(element, value);
          setError(!valid);
          submitValue(element.id, value);
        }}
      >
        <SelectTrigger className={cn('w-full', error && 'border-destructive')}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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
  const { updateElement, setSelectedElement } = useDesigner();
  const defaultValues = {
    label: element.additionalAttributes.label,
    helperText: element.additionalAttributes.helperText,
    required: element.additionalAttributes.required,
    placeholder: element.additionalAttributes.placeholder,
    options: element.additionalAttributes.options,
  };

  const form = useForm<TPropertiesSchemaSelect>({
    resolver: zodResolver(propertiesSchemaSelect),
    mode: 'onSubmit',
    defaultValues,
  });
  useEffect(() => {
    form.reset(element.additionalAttributes);
  }, [element, form]);
  function applyChanges(values: TPropertiesSchemaSelect) {
    const { label, helperText, required, placeholder, options } = values;

    updateElement(element.id, {
      ...element,
      additionalAttributes: {
        label,
        helperText,
        required,
        placeholder,
        options,
      },
    });
    toast.success('Properties changed successfully');
    setSelectedElement(null);
  }
  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(applyChanges)}>
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
          name="options"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Options</FormLabel>
                <Button
                  variant="outline"
                  onClick={e => {
                    e.preventDefault();
                    form.setValue('options', field.value.concat('New option'));
                  }}
                >
                  <Plus />
                  Add
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                {form.watch('options').map((option, index) => (
                  <div key={index} className="flex items-center justify-between gap-1">
                    <Input
                      placeholder=""
                      value={option}
                      onChange={e => {
                        field.value[index] = e.target.value;
                        field.onChange(field.value);
                      }}
                    />
                    <Button
                      variant="ghost"
                      size={'icon'}
                      onClick={e => {
                        e.preventDefault();
                        const newOptions = [...field.value];
                        newOptions.splice(index, 1);
                        field.onChange(newOptions);
                      }}
                    >
                      <X />
                    </Button>
                  </div>
                ))}
              </div>
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
        <Separator />
        <Button variant="outline" className="w-full">
          Save
        </Button>
      </form>
    </Form>
  );
}
