import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

const EmptyProductTable = () => {
  return (
    <Card className='h-[75vh] flex items-center justify-center'>
      <div className='flex flex-col items-center justify-center gap-4'>
        <h1 className='text-2xl font-bold'>No products found</h1>
        <p className='text-sm text-muted-foreground'>
          You can add a new product by clicking the button below.
        </p>
        <Link
          href='products/new'
          className={cn(buttonVariants({ variant: 'default', size: 'lg' }))}
        >
          Add Product
        </Link>
      </div>
    </Card>
  );
};

export default EmptyProductTable;
