import React from 'react';
import ProductTable from './components/product-table';
import { getProducts } from './data/get-products';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const ProductsPage = async () => {
  const products = await getProducts();
  return (
    <div>
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-2xl font-bold'>Products</h1>
        <Link
          href='/dashboard/products/new'
          className={cn(buttonVariants({ variant: 'default', size: 'lg' }))}
        >
          Add Product
        </Link>
      </div>
      <ProductTable products={products} />
    </div>
  );
};

export default ProductsPage;
