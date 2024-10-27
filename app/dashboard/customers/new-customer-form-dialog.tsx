'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import NewCustomerForm from './new-customer-form';

export default function NewCustomerFormDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant='outline'
            className='border-primary border-[0.1px] text-primary'
          >
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[650px]'>
          <DialogHeader>
            <DialogTitle className='text-primary text-4xl font-medium'>
              Nouveau Client
            </DialogTitle>
            <DialogDescription>
              Entrez ici les informations du client. Cliquez sur Créer lorsque
              vous avez terminé.
            </DialogDescription>
          </DialogHeader>
          <NewCustomerForm
            onCancel={() => setIsOpen(!isOpen)}
            onSuccess={() => setIsOpen(!isOpen)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
