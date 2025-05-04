import React from 'react';
import SidebarBtnElement from '@/components/dashboard-user/SidebarBtnElement';
import { FormElements } from '@/components/dashboard-user/FormElement';
import { Separator } from '@/components/ui/separator';

const FormElementsSidebar = () => {
  return (
    <div>
      <p className="text-foreground">Form elements</p>
      <Separator className="my-2" />
      <div className="grid grid-cols-1 gap-4">
        <p className="text-muted-foreground col-span-1 my-1 text-sm">Layout elements</p>
        <SidebarBtnElement formElement={FormElements.TitleField} />
        <SidebarBtnElement formElement={FormElements.SubTitleField} />
        <SidebarBtnElement formElement={FormElements.ParagraphField} />
        <SidebarBtnElement formElement={FormElements.SeparatorField} />
        <SidebarBtnElement formElement={FormElements.SpacerField} />

        <p className="text-muted-foreground col-span-1 my-1 text-sm">Form elements</p>
        <SidebarBtnElement formElement={FormElements.TextField} />
        <SidebarBtnElement formElement={FormElements.NumberField} />
        <SidebarBtnElement formElement={FormElements.TextAreaField} />
        <SidebarBtnElement formElement={FormElements.DateField} />
        <SidebarBtnElement formElement={FormElements.SelectField} />
        <SidebarBtnElement formElement={FormElements.CheckboxField} />
      </div>
    </div>
  );
};

export default FormElementsSidebar;
