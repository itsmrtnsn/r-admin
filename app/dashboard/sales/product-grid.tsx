'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { PlusIcon } from '@radix-ui/react-icons';
import { Fragment } from 'react';
import { useCartStore } from './cart-store';
import { SellableProduct } from '../_actions/get-sellable-product';

interface Props {
  products: SellableProduct[];
}

const ProductGrid = ({ products }: Props) => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-4'>
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
  product: SellableProduct;
}

const ProductCardComponent = ({ product }: CardProps) => {
  const { addItem, items } = useCartStore();

  const currentQuantityInCart =
    items.find((item) => item.product.id === product.id)?.quantity || 0;

  const isMaxQuantityReached = currentQuantityInCart >= product.quantityInStock;

  return (
    <Card className='overflow-hidden border-[0.1px] bg-slate-50 shadow-none transition-all duration-300 hover:shadow-md '>
      <CardContent className='p-4'>
        <div className='flex flex-col h-full'>
          <h2 className='text-sm font-medium mb-2  line-clamp-1 text-black'>
            {product.name}
          </h2>
          <p className='text-muted-foreground text-sm mb-2 font-medium'>
            {product.category.name}
          </p>
          <div className='flex justify-between items-center mt-auto'>
            <p className='text-sm font-bold text-primary'>
              {product.price} <span className='font-semibold text-xs'>GDS</span>
            </p>
            <Button
              variant={'outline'}
              disabled={product.quantityInStock === 0 || isMaxQuantityReached}
              className={cn(
                'rounded-full w-10 h-10 p-0  transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 hover:border-blue-600'
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
