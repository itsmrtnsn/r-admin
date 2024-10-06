'use client';

import { Button } from '@/components/ui/button';
import { ChevronsLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()} variant='outline' size='icon'>
      <ChevronsLeft className='w-4 h-4' />
    </Button>
  );
};

export default BackButton;
