import React from 'react';
import { getFormContentByUrl } from '@/actions/actions';
import { FormElementInstance } from '@/components/dashboard-user/FormElement';
import FormSubmitComponent from '@/components/forms/FormSubmitComponent';

const Page = async ({ params }: { params: { formUrl: string } }) => {
  const form = await getFormContentByUrl(params.formUrl);
  if (!form) {
    throw new Error('Form not found');
  }
  const formContent = JSON.parse(form.content) as FormElementInstance[];
  return <FormSubmitComponent formUrl={params.formUrl} content={formContent} />;
};

export default Page;
