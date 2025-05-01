'use client';
import React, { useMemo } from 'react';
import { formSchema, TFormSchema } from '@/definitions/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { InputField, TextAreaField } from '@/components/ui/InputField';
import { DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { loaderIcon } from '@/definitions/constants';
import { createForm } from '@/actions/actions';
import { useRouter } from 'next/navigation';

const DialogFormFields = () => {
  const router = useRouter();
  const defaultValues = useMemo(
    () => ({
      name: '',
      description: '',
    }),
    [],
  );

  const form = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  async function onSubmit(values: TFormSchema) {
    try {
      const formId = await createForm(values);
      toast.success('Form successfully created!');
      router.push(`/form-builder/${formId}`);
    } catch (error) {
      toast.error('Uh oh! Something went wrong.', {
        description: 'There was a problem with your request.',
      });
      console.log(error);
    }
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <InputField
            id="name"
            control={form.control}
            name="name"
            label="Name"
            placeholder="enter a name of form"
            type="text"
          />
          <TextAreaField
            id="description"
            control={form.control}
            name="description"
            label="Description of a form"
            placeholder="description"
          />
        </form>
      </Form>
      <DialogFooter>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          disabled={!form.formState.isValid || form.formState.isSubmitting}
          className="mt-4 w-full"
        >
          {!form.formState.isSubmitting && <span>Save...</span>}
          {form.formState.isSubmitting && loaderIcon}
        </Button>
      </DialogFooter>
    </>
  );
};

export default DialogFormFields;
