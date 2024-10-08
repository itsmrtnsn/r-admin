'use client';

import { Fragment } from 'react';
import { ProductCard as ProductCardType } from './types/product';
import { Card, CardContent } from '@/components/ui/card';
import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { useCartStore } from './cart-store';
import { cn } from '@/lib/utils';

interface Props {
  products: ProductCardType[];
}

const ProductGrid = ({ products }: Props) => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4'>
      {products.map((product) => (
        <Fragment key={product.id}>
          <ProductCardComponent product={product} />
        </Fragment>
      ))}
    </div>
  );
};

export default ProductGrid;

// product card component

interface CardProps {
  product: ProductCardType;
}

const ProductCardComponent = ({ product }: CardProps) => {
  const { addItem, items } = useCartStore();

  const currentQuantityInCart =
    items.find((item) => item.product.id === product.id)?.quantity || 0;

  const isMaxQuantityReached = currentQuantityInCart >= product.quantityInStock;

  return (
    <Card className='overflow-hidden border-[0.1px] bg-[#0a0a0a] shadow-none transition-all duration-300 hover:shadow-md'>
      <CardContent className='p-4'>
        <div className='flex flex-col h-full'>
          <h2 className='text-sm font-bold mb-2  line-clamp-1'>
            {product.name}
          </h2>
          <p className='text-muted-foreground text-xs mb-2 font-medium'>
            {product.category}
          </p>
          <div className='flex justify-between items-center mt-auto'>
            <p className='text-base font-bold text-blue-700'>
              {product.price} <span className='font-semibold text-sm'>GDS</span>
            </p>
            <Button
              variant={'outline'}
              disabled={product.quantityInStock === 0 || isMaxQuantityReached}
              className={cn(
                'rounded-full w-10 h-10 p-0  transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2'
              )}
              onClick={() => addItem(product)}
            >
              <PlusIcon strokeWidth={0.5} className='w-6 h-6' />
              <span className='sr-only'>Add to Order</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
