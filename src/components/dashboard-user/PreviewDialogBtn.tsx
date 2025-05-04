import React from 'react';
import { Button } from '@/components/ui/button';
import { viewIcon } from '@/definitions/constants';
import useDesigner from '@/hooks/useDesigner';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { FormElements } from '@/components/dashboard-user/FormElement';

const PreviewDialogBtn = () => {
  const { elements } = useDesigner();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{viewIcon} Preview</Button>
      </DialogTrigger>
      <DialogContent className="flex h-[calc(100vh-2rem)] max-h-screen w-[calc(100vw-2rem)] max-w-full flex-grow flex-col gap-0 p-0 sm:max-w-full">
        <div className="borber-b px-4 py-2">
          <h2 className="text-muted-foreground text-lg font-bold">Form preview</h2>
        </div>
        <div className="bg-accent flex flex-grow flex-col items-center justify-center overflow-y-auto bg-[url(/paper.svg)] p-4 dark:bg-[url(/paper-dark.svg)]">
          <div className="bg-background flex h-full w-full max-w-[620px] flex-grow flex-col gap-4 overflow-y-auto rounded-md p-8">
            {elements.map(element => {
              const FormComponent = FormElements[element.type].formComponent;
              return <FormComponent key={element.id} elementInstance={element} />;
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDialogBtn;
