import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const AddNewProducts = () => {
  return (
    <Link
      href='/dashboard/products/new'
      className={cn(
        buttonVariants(),
        'bg-primary rounded-lg text-white hover:bg-blue-800 transition-colors ease-linear duration-300 font-normal'
      )}
    >
      <Plus className='mr-2 w-5 h-5' />
      Ajouter un article
    </Link>
  );
};

export default AddNewProducts;
