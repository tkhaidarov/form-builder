'use client';
import React, { createContext, Dispatch, SetStateAction, useState } from 'react';
import { FormElementInstance } from '@/components/dashboard-user/FormElement';

type TDesignerContext = {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
  removeElement: (index: string) => void;
  selectedElement: FormElementInstance | null;
  setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>;
  updateElement: (id: string, element: FormElementInstance) => void;
  setElements: Dispatch<SetStateAction<FormElementInstance[]>>;
};
export const DesignerContext = createContext<TDesignerContext | null>(null);

export default function DesignerContextProvider({ children }: { children: React.ReactNode }) {
  const [elements, setElements] = useState<FormElementInstance[]>([]);
  const [selectedElement, setSelectedElement] = useState<FormElementInstance | null>(null);
  const addElement = (index: number, element: FormElementInstance) => {
    setElements(prev => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };
  const removeElement = (id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
  };
  const updateElement = (id: string, element: FormElementInstance) => {
    setElements(prev => {
      const newElements = [...prev];
      const index = newElements.findIndex(el => el.id === id);
      newElements[index] = element;
      return newElements;
    });
  };
  return (
    <DesignerContext.Provider
      value={{
        elements,
        addElement,
        removeElement,
        selectedElement,
        setElements,
        setSelectedElement,
        updateElement,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}
