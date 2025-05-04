import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { IInputProps } from '@/definitions/definitions';

export const InputField: React.FC<IInputProps> = ({
  id,
  control,
  placeholder,
  name,
  label,
  type = 'text',
  icon,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="m-0 min-h-[5.4rem]">
          <FormLabel htmlFor={id} className="text-muted-foreground h-[1.1rem] leading-none">
            {label}
          </FormLabel>
          <FormControl>
            <div className="relative h-9">
              <Input
                id={id}
                {...field}
                type={type}
                placeholder={placeholder}
                className="pr-8"
                autoComplete={id}
                onKeyDown={e => {
                  if (e.key === 'Enter') e.currentTarget.blur();
                }}
              />
              {icon}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const TextAreaField: React.FC<IInputProps> = ({ id, control, placeholder, name, label }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={id} className="text-muted-foreground h-[1.1rem] leading-none">
            {label}
          </FormLabel>
          <FormControl>
            <Textarea rows={5} id={id} {...field} placeholder={placeholder} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
