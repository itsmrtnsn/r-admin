'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deleteProduct } from '../../_actions/delete-product';

interface Props {
  id: string;
}

const DeleteProductConfirmation = async ({ id }: Props) => {
  const router = useRouter();

  const handleDelete = async () => {
    const response = await deleteProduct(id);

    if (response.success) {
      router.push('/dashboard/products');
      toast.success(response.message);
    }

    if (!response.success) {
      toast.error(response.message);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='destructive'>supprimer ce produit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Êtes-vous absolument sûr ?</DialogTitle>
          <DialogDescription>
            Cette action ne peut pas être annulée. Cela supprimera
            définitivement votre compte et vos données de nos serveurs.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button>Cancel</Button>
          <Button variant={'destructive'} onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProductConfirmation;
