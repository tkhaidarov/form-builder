import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="mx-auto flex h-full w-full flex-grow">{children}</div>;
};

export default Layout;
