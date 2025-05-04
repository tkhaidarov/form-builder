import React from 'react';
import { getFormById } from '@/actions/actions';
import FormBuilder from '@/components/dashboard-user/FormBuilder';
type Props = {
  params: Promise<{ id: string }>;
};
const Page = async ({ params }: Props) => {
  const { id } = await params;
  const form = await getFormById(id);
  if (!form) {
    throw new Error('Form not found');
  }
  return <FormBuilder form={form} />;
};

export default Page;
