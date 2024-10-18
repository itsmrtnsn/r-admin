import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

const AddNewProducts = () => {
  return (
    <Link
      href='/dashboard/products/new'
      className={cn(
        buttonVariants({ variant: 'outline' }),
        'bg-blue-600 text-white hover:bg-blue-800 transition-colors ease-linear duration-300'
      )}
    >
      Ajouter un article
    </Link>
  );
};

export default AddNewProducts;
