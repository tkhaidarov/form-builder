'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { CreateForm } from '@/components/main-page/Links';
import { v4 as uuidv4 } from 'uuid';

const Templates = () => {
  return (
    <div className="flex flex-col gap-3 pt-6">
      <h3 className="ml-2 text-lg font-medium">Create a form</h3>
      <div className="flex justify-between">
        <NewForm />
        <div className="flex gap-6">
          <Template />
          <Template />
          <Template />
          <Template />
          <Template />
        </div>
      </div>
    </div>
  );
};

export default Templates;

export function Template() {
  return (
    <div className="flex flex-col gap-1">
      <div className="h-32 w-[170px] cursor-pointer rounded-md border-[1.5px] bg-amber-400 transition hover:scale-[1.01] hover:border-gray-400">
        {/*<Image src={} alt={} />*/}
      </div>
      <span className="ml-2 text-sm">Contact Form</span>
    </div>
  );
}

export function NewForm() {
  const [id, setId] = useState<string | null>(null);
  useEffect(() => {
    setId(uuidv4());
  }, []);
  if (!id) return null;
  return (
    <div className="flex flex-col gap-1">
      <CreateForm id={id} />
      <span className="ml-2 text-sm">Contact Form</span>
    </div>
  );
}
