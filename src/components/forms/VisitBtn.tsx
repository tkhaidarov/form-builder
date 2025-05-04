'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

const VisitBtn = ({ shareUrl }: { shareUrl: string }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  });
  if (!mounted) return null;

  const shareLink = `${window.location.origin}/submit/${shareUrl}`;

  return (
    <Button
      onClick={() => {
        window.open(shareLink, '_blank');
      }}
      className="w-48"
    >
      Visit
    </Button>
  );
};

export default VisitBtn;
