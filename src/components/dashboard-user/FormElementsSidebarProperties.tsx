import React from 'react';
import useDesigner from '@/hooks/useDesigner';
import { FormElements } from '@/components/dashboard-user/FormElement';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const FormElementsSidebarProperties = () => {
  const { selectedElement, setSelectedElement } = useDesigner();
  if (!selectedElement) return null;
  const PropertiesForm = FormElements[selectedElement?.type].propertiesComponent;
  return (
    <div className="flex flex-col p-2">
      <div className="flex items-center justify-between">
        <p className="font-medium">Element properties</p>
        <Button size={'icon'} variant="ghost" onClick={() => setSelectedElement(null)}>
          <X />
        </Button>
      </div>
      <Separator className="mb-4" />
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
};

export default FormElementsSidebarProperties;
