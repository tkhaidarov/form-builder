'use client';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { GripVertical } from 'lucide-react';

type TSortableItem = {
  id: string;
  name?: string;
};

export function SortableItem(props: TSortableItem) {
  const { id, name } = props;
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={{ ...style }} className="flex h-8 gap-4 border">
      <GripVertical className="cursor-grab" {...listeners} {...attributes} />
      <span>{name}</span>
    </div>
  );
}
