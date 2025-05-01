'use client';
import React, { useState } from 'react';
import DesignerSideBar from '@/components/dashboard-user/DesignerSideBar';
import { DragEndEvent, useDndMonitor, useDraggable, useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import useDesigner from '@/hooks/useDesigner';
import { Trash2 } from 'lucide-react';
import {
  FormElementInstance,
  FormElements,
  TElementsType,
} from '@/components/dashboard-user/FormElement';
import { idGenerator } from '@/lib/idGenerator';
import { Button } from '@/components/ui/button';

const Designer = () => {
  const { elements, addElement } = useDesigner();
  const droppable = useDroppable({
    id: 'designer-drop-area',
    data: {
      isDesignerDropArea: true,
    },
  });
  console.log('Elements:', elements);
  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;
      const isDesignerBtnElement = active?.data?.current?.isDesignerBtnElement;
      if (isDesignerBtnElement) {
        const type = active?.data?.current?.type;
        const newElement = FormElements[type as TElementsType].construct(idGenerator());
        addElement(0, newElement);
        console.log(newElement);
      }
      console.log(event);
    },
  });
  return (
    <div className="flex h-full w-full">
      <div className="w-full p-4">
        <div
          ref={droppable.setNodeRef}
          className={cn(
            'bg-background border-primary/30 m-auto flex h-full max-w-[920px] flex-1 flex-grow flex-col items-center justify-start overflow-y-auto rounded-xl border-2 border-dashed',
            droppable.isOver && 'border-primary/70 border-dashed',
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className="text-muted-foreground flex flex-grow items-center text-3xl font-bold">
              Drop here
            </p>
          )}
          {droppable.isOver && elements.length === 0 && (
            <div className="w-full p-4">
              <div className="bg-primary/10 h-28 rounded-md"></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className="flex w-full flex-col gap-2 p-4">
              {elements.map(el => (
                <DesignerElementWrapper key={el.id} element={el} />
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignerSideBar />
    </div>
  );
};

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
  const { removeElement } = useDesigner();
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
  const topHalf = useDroppable({
    id: element.id + '-top',
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfElement: true,
    },
  });
  const bottomHalf = useDroppable({
    id: element.id + '-bottom',
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + '-drag-handler',
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });
  if (draggable.isDragging) return null;
  const DesignerElement = FormElements[element.type].designerComponent;
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      className="text-foreground ring-primary/30 relative flex h-28 flex-col rounded-md ring-1 ring-inset hover:cursor-pointer"
    >
      <div ref={topHalf.setNodeRef} className="absolute h-1/2 w-full rounded-t-md"></div>
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute bottom-0 h-1/2 w-full rounded-b-md"
      ></div>
      {mouseIsOver && (
        <>
          <div className="absolute right-0 h-full">
            <Button
              onClick={() => removeElement(element.id)}
              variant="outline"
              className="bg-destructive flex h-full justify-center rounded-md rounded-l-none border"
            >
              <Trash2 className="[&_svg:not([class*='size-'])]:size-5" />
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-muted-foreground text-sm">
              Click to change properties or drag to move
            </p>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div className="bg-primary absolute top-0 h-2 w-full rounded-md rounded-b-none" />
      )}
      <div
        className={cn(
          'bg-accent/40 pointer-events-none flex h-28 w-full items-center rounded-md px-4 py-2 opacity-100',
          mouseIsOver && 'opacity-30',
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
      {bottomHalf.isOver && (
        <div className="bg-primary absolute bottom-0 h-2 w-full rounded-md rounded-t-none" />
      )}
    </div>
  );
}
export default Designer;
