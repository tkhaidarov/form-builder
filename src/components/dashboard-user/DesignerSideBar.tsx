import React from 'react';
import { FormElements } from '@/components/dashboard-user/FormElement';
import SidebarBtnElement from '@/components/dashboard-user/SidebarBtnElement';
import useDesigner from '@/hooks/useDesigner';
import FormElementsSidebar from '@/components/dashboard-user/FormElementsSidebar';
import FormElementsSidebarProperties from '@/components/dashboard-user/FormElementsSidebarProperties';

const DesignerSideBar = () => {
  const { selectedElement } = useDesigner();
  return (
    <aside className="border-muted bg-background flex h-full w-96 max-w-96 flex-grow flex-col gap-2 overflow-y-auto border-l-2 p-4">
      {!selectedElement && <FormElementsSidebar />}
      {selectedElement && <FormElementsSidebarProperties />}
    </aside>
  );
};

export default DesignerSideBar;
