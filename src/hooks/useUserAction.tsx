'use client';
import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';

const useUserAction = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('hook useDesigner must be used within the DesignerContext');
  }
  return context;
};

export default useUserAction;
