'use client';
import { useContext } from 'react';
import { DesignerContext } from '@/context/DesignerContext';

const UseDesigner = () => {
  const context = useContext(DesignerContext);
  if (!context) {
    throw new Error('hook useDesigner must be used within the DesignerContext');
  }
  return context;
};

export default UseDesigner;
