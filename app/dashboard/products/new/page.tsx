'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';
import ProductInfoForm from './product-info';
import ProductCategoryForm from './product-category';
import ProductStatusBadge from '../components/product-status-badge';
const NewProductPage = () => {
  const router = useRouter();
  return (
    <div>
      <div className='flex items-center gap-4 mb-10'>
        <Button
          variant='outline'
          size='icon'
          className='h-7 w-7 bg-card/30'
          onClick={() => router.back()}
        >
          <ChevronLeft className='h-4 w-4 ' />
          <span className='sr-only'>Back</span>
        </Button>
        <h1 className='flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0'>
          New Product
        </h1>
        <ProductStatusBadge status='published' />
        <div className='hidden items-center gap-2 md:ml-auto md:flex'>
          <Button size='sm' variant='destructive'>
            Discard Changes
          </Button>
          <Button
            size='sm'
            className='text-white bg-gradient-to-r from-[#1488CC] to-[#2B32B2] hover:bg-primary transition-all ease-in-out '
          >
            Save Product
          </Button>
        </div>
      </div>
      <main className='grid grid-cols-[1fr_auto] gap-8'>
        <ProductInfoForm />
        <ProductCategoryForm />
      </main>
    </div>
  );
};

export default NewProductPage;
