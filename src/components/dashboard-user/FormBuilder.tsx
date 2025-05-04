'use client';
import React, { useEffect, useState } from 'react';
import { Form } from '@/generated/prisma';
import PreviewDialogBtn from '@/components/dashboard-user/PreviewDialogBtn';
import SaveFormBtn from '@/components/dashboard-user/SaveFormBtn';
import PublishFormBtn from '@/components/dashboard-user/PublishFormBtn';
import Designer from '@/components/dashboard-user/Designer';
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import DragOverlayWrapper from '@/components/dashboard-user/DragOverlayWrapper';
import useDesigner from '@/hooks/useDesigner';
import { Loader2, MoveRight, MoveLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Link from 'next/link';

const FormBuilder = ({ form }: { form: Form }) => {
  const [isReady, setIsReady] = useState(false);
  const { setElements, setSelectedElement } = useDesigner();

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
  );

  useEffect(() => {
    if (isReady) return;
    const elements = JSON.parse(form.content);
    setElements(elements);
    setSelectedElement(null);
    const readyTimeout = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(readyTimeout);
  }, [form, setElements, isReady, setSelectedElement]);

  if (!isReady) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Loader2 size={36} className="animate-spin" />
      </div>
    );
  }
  const shareUrl = `${window.location.origin}/submit/${form.shareUrl}`;
  if (form.published) {
    return (
      <>
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="max-w-md">
            <h1 className="text-primary mb-10 border-b pb-2 text-center text-4xl font-bold">
              Your form published
            </h1>
            <h2 className="text-2xl">Share this form</h2>
            <h3 className="text-muted-foreground border-b pb-10 text-xl">
              Anyone can view and submit the form with the link
            </h3>
            <div className="my-4 flex w-full flex-col items-center gap-2 border-b pb-4">
              <Input className="w-full" readOnly value={shareUrl} />
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  toast.success('Link copied to clipboard');
                }}
                className="mt-2 w-full"
              >
                Copy link
              </Button>
            </div>
            <div className="flex justify-between">
              <Button variant="ghost" asChild>
                <Link href="/dashboard-user">
                  <MoveLeft />
                  Go to dashboard
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href={`/forms/${form.id}`}>
                  Form details
                  <MoveRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <DndContext sensors={sensors}>
      <main className="flex w-full flex-col">
        <nav className="flex items-center justify-between gap-3 border-b-2 p-4">
          <h2 className="truncate font-medium">
            <span className="text-muted-foreground mr-2">Form:</span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogBtn />
            {!form.published && (
              <>
                <SaveFormBtn id={form.id} />
                <PublishFormBtn id={form.id} />
              </>
            )}
          </div>
        </nav>
        <div className="bg-accent relative flex h-[200px] w-full flex-grow items-center justify-center overflow-y-auto bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default FormBuilder;
