import React from 'react';
import { Active, DragCancelEvent, DragOverlay, DragStartEvent, useDndMonitor } from '@dnd-kit/core';
import { SidebarBtnElementDragOverlay } from '@/components/dashboard-user/SidebarBtnElement';
import { FormElements, TElementsType } from '@/components/dashboard-user/FormElement';
import useDesigner from '@/hooks/useDesigner';

const DragOverlayWrapper = () => {
  const { elements } = useDesigner();
  const [draggedItem, setDraggedItem] = React.useState<Active | null>(null);
  useDndMonitor({
    onDragStart(event: DragStartEvent) {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });
  if (!draggedItem) return null;
  let node = <span>No drag overlay</span>;
  const isSidebarBtnElement = draggedItem?.data?.current?.isDesignerBtnElement;

  if (isSidebarBtnElement) {
    const type = draggedItem?.data?.current?.type as TElementsType;
    node = <SidebarBtnElementDragOverlay formElement={FormElements[type]} />;
  }
  const isDesignerElement = draggedItem?.data?.current?.isDesignerElement;
  if (isDesignerElement) {
    const elementId = draggedItem?.data?.current?.elementId;
    const element = elements.find(el => el.id === elementId);
    if (!element) node = <div>Element not found...</div>;
    else {
      const DesignerElementComponent = FormElements[element.type].designerComponent;
      node = (
        <div className="bg-accent pointer-events-none flex h-28 w-[80%] rounded-md border px-4 py-2 opacity-90">
          <DesignerElementComponent elementInstance={element} />
        </div>
      );
    }
  }
  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
