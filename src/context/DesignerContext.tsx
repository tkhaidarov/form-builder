'use client';
import React, { createContext, useState } from 'react';
import { FormElementInstance } from '@/components/dashboard-user/FormElement';

type TDesignerContext = {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
  removeElement: (index: string) => void;
};
export const DesignerContext = createContext<TDesignerContext | null>(null);

export default function DesignerContextProvider({ children }: { children: React.ReactNode }) {
  const [elements, setElements] = useState<FormElementInstance[]>([]);

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

  return (
    <DesignerContext.Provider
      value={{
        elements,
        addElement,
        removeElement,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}
