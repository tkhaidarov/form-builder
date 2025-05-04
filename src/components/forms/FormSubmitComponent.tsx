'use client';
import React, { useCallback, useRef, useState, useTransition } from 'react';
import { FormElementInstance, FormElements } from '@/components/dashboard-user/FormElement';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { loaderIcon } from '@/definitions/constants';
import { onSubmitForm } from '@/actions/actions';

const FormSubmitComponent = ({
  formUrl,
  content,
}: {
  formUrl: string;
  content: FormElementInstance[];
}) => {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());
  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  const validateForm: () => boolean = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || '';
      const valid = FormElements[field.type].validate(field, actualValue);
      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }
    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }
    return true;
  }, [content]);

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
  }, []);
  const submitForm = async () => {
    formErrors.current = {};
    const validForms = validateForm();
    if (!validForms) {
      setRenderKey(new Date().getTime());
      toast.error('Please check the form for errors');
      return;
    }
    try {
      const jsonContent = JSON.stringify(formValues.current);
      await onSubmitForm(formUrl, jsonContent);
      setSubmitted(true);
    } catch (error) {
      toast.error('Oops, something went wrong, please try later again');
    }
  };
  if (submitted) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <div className="bg-background flex w-full max-w-[620px] flex-grow flex-col gap-4 overflow-y-auto border p-8 shadow-xl shadow-slate-500">
          <h1 className="text-2xl font-bold"> Form submitted</h1>
          <p className="text-muted-foreground">
            Thank you for submitting the form. You can close this page now.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        key={renderKey}
        className="bg-background flex w-full max-w-[620px] flex-grow flex-col gap-4 overflow-y-auto rounded border p-8 shadow-xl shadow-slate-500"
      >
        {content.map(element => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
            />
          );
        })}
        <Button disabled={pending} onClick={() => startTransition(submitForm)} className="mt-8">
          {!pending && <>Submit</>}
          {pending && loaderIcon}
        </Button>
      </div>
    </div>
  );
};

export default FormSubmitComponent;
