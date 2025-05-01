import React from 'react';
import { FormElements } from '@/components/dashboard-user/FormElement';
import SidebarBtnElement from '@/components/dashboard-user/SidebarBtnElement';

const DesignerSideBar = () => {
  return (
    <aside className="border-muted bg-background flex h-full w-96 max-w-96 flex-grow flex-col gap-2 overflow-y-auto border-l-2 p-4">
      Elements
      <SidebarBtnElement formElement={FormElements.TextField} />
    </aside>
  );
};

export default DesignerSideBar;
