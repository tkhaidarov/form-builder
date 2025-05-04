'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Share2 } from 'lucide-react';
import { toast } from 'sonner';

const FormLinkShare = ({ shareUrl }: { shareUrl: string }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  });
  if (!mounted) return null;
  const shareLink = `${window.location.origin}/submit/${shareUrl}`;
  return (
    <div className="flex flex-grow items-center gap-4">
      <Input value={shareLink} readOnly />
      <Button
        variant="outline"
        className="w-48"
        onClick={() => {
          navigator.clipboard.writeText(shareLink);
          toast.success('Link copied to clipboard');
        }}
      >
        <Share2 />
        Share link
      </Button>
    </div>
  );
};

export default FormLinkShare;
