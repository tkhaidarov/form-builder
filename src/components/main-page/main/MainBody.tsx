import React from 'react';
import Templates from '@/components/main-page/main/Templates';
import RecentForms from '@/components/main-page/main/RecentForms';
const MainBody = () => {
  return (
    <>
      <div className="h-64 w-full bg-gray-100">
        <div className="mx-auto flex max-w-[72rem] flex-col">
          <Templates />
        </div>
      </div>
      <div className="mx-auto flex max-w-[72rem] flex-col">
        <Templates />
      </div>
    </>
  );
};

export default MainBody;
