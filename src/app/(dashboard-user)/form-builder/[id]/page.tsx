import React from 'react';
import { getFormById } from '@/actions/actions';
import FormBuilder from '@/components/dashboard-user/FormBuilder';

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = await Promise.resolve(params);
  const form = await getFormById(id);
  if (!form) {
    throw new Error('Form not found');
  }
  return <FormBuilder form={form} />;
};

export default Page;
