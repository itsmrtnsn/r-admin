import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlusIcon } from 'lucide-react';
import React from 'react';
import { useCartStore } from './cart-store';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    category: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCartStore();

  return (
    <Card className='overflow-hidden transition-all duration-300 hover:shadow-lg'>
      <CardContent className='p-4'>
        <div className='flex flex-col h-full'>
          <h2 className='text-lg font-semibold mb-2 text-gray-900 line-clamp-1'>
            {product.name}
          </h2>
          <p className='text-gray-600 text-sm mb-2'>{product.category}</p>
          <div className='flex justify-between items-center mt-auto'>
            <p className='text-2xl font-bold text-blue-600'>
              ${product.price.toFixed(2)}
            </p>
            <Button
              className='rounded-full w-10 h-10 p-0 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
              onClick={() => addItem(product)}
            >
              <PlusIcon className='w-6 h-6' />
              <span className='sr-only'>Add to Order</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
