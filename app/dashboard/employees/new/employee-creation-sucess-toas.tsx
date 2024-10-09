'use client';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

export function EmployeeCreationSuccessToast() {
  return (
    <Button
      variant='outline'
      onClick={() =>
        toast.success('Employee has been created Successfully', {
          description: 'Sunday, December 03, 2023 at 9:00 AM',
        })
      }
    >
      Show Toast
    </Button>
  );
}
