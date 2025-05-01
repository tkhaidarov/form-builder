import React from 'react';

const Divider = () => {
  return (
    <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
      <span className="bg-card text-muted-foreground relative z-10 px-2">Or continue with</span>
    </div>
  );
};

export default Divider;
