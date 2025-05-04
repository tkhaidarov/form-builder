import React from 'react';
import { getFormContentByUrl } from '@/actions/actions';
import { FormElementInstance } from '@/components/dashboard-user/FormElement';
import FormSubmitComponent from '@/components/forms/FormSubmitComponent';

type Props = {
  params: Promise<{ formUrl: string }>;
};

const Page = async ({ params }: Props) => {
  const { formUrl } = await params;
  const form = await getFormContentByUrl(formUrl);
  if (!form) {
    throw new Error('Form not found');
  }
  const formContent = JSON.parse(form.content) as FormElementInstance[];
  return <FormSubmitComponent formUrl={formUrl} content={formContent} />;
};

export default Page;
