'use client';
import React from 'react';
import { Form } from '@/generated/prisma';
import PreviewDialogBtn from '@/components/dashboard-user/PreviewDialogBtn';
import SaveFormBtn from '@/components/dashboard-user/SaveFormBtn';
import PublishFormBtn from '@/components/dashboard-user/PublishFormBtn';
import Designer from '@/components/dashboard-user/Designer';
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import DragOverlayWrapper from '@/components/dashboard-user/DragOverlayWrapper';

const FormBuilder = ({ form }: { form: Form }) => {
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
                <SaveFormBtn />
                <PublishFormBtn />
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
