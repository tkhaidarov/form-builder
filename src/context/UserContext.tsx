'use client';
import React, { createContext, useCallback, useState } from 'react';
import { toast } from 'sonner';
import { blockUserApi } from '@/actions/user';

type TUserContext = {
  selectedUsersIds: string[];
  setSelectedUsersIds: (selectedIds: string[]) => void;
  isProcessing: boolean;
  refreshContent: () => void;
  shouldRefresh: boolean;
  blockUser: () => void;
};

export const UserContext = createContext<TUserContext | null>(null);
export default function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [selectedUsersIds, setSelectedUsersIds] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [shouldRefresh, setShouldRefresh] = useState<boolean>(false);

  const refreshContent = useCallback(() => {
    setShouldRefresh(true);
    setTimeout(() => {
      setShouldRefresh(false);
    }, 1000);
  }, []);

  const blockUser = useCallback(async () => {
    if (selectedUsersIds.length === 0) {
      toast.warning('Please select at least one user');
      return;
    }
    setIsProcessing(true);
    try {
      const { success, error } = await blockUserApi(selectedUsersIds);
      if (success) {
        toast.success('User(s) blocked successfully');
        setSelectedUsersIds([]);
        refreshContent();
      } else {
        throw new Error(error);
      }
    } catch (error) {
      toast.error('Something went wrong, please try again');
    } finally {
      setIsProcessing(false);
    }
  }, [selectedUsersIds, refreshContent]);

  return (
    <UserContext.Provider
      value={{
        selectedUsersIds,
        blockUser,
        setSelectedUsersIds,
        isProcessing,
        refreshContent,
        shouldRefresh,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
