'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ProductStatusBadge from '../components/product-status-badge';
import ProductInfoForm from './product-info';
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
          Créer un Article
        </h1>
        <ProductStatusBadge status='published' />
        <div className='hidden items-center gap-2 md:ml-auto md:flex'>
          <Button size='sm' variant='destructive'>
            Annuler
          </Button>
        </div>
      </div>
      <ProductInfoForm onSubmit={() => console.log('submit')} />
    </div>
  );
};

export default NewProductPage;
