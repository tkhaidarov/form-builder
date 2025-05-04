import React from 'react';
import { FormElement } from '@/components/dashboard-user/FormElement';
import { Button } from '@/components/ui/button';
import { useDraggable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';

const SidebarBtnElement = ({ formElement }: { formElement: FormElement }) => {
  const { label, icon: Icon } = formElement.designerBtnElement;
  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    },
  });
  return (
    <Button
      ref={draggable.setNodeRef}
      variant="ghost"
      className={cn(
        "border-primary/30 flex h-10 w-full cursor-grab justify-start gap-3 border border-dashed text-[16px] [&_svg:not([class*='size-'])]:size-5",
        draggable.isDragging && 'border-primary border-dashed',
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="cursor-grab" />
      <span className="">{label}</span>
    </Button>
  );
};

export default SidebarBtnElement;

export const SidebarBtnElementDragOverlay = ({ formElement }: { formElement: FormElement }) => {
  const { label, icon: Icon } = formElement.designerBtnElement;
  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    },
  });
  return (
    <Button
      variant="secondary"
      className="border-primary/30 flex h-10 w-52 cursor-grab justify-start gap-3 border border-dashed text-[16px] [&_svg:not([class*='size-'])]:size-5"
    >
      <Icon className="cursor-grab" />
      <span className="">{label}</span>
    </Button>
  );
};
