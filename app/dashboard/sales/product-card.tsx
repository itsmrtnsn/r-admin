import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlusIcon } from 'lucide-react';
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
    <Card className='overflow-hidden border-[0.1px] border-slate-300 shadow-none transition-all duration-300 hover:shadow-md '>
      <CardContent className='p-4'>
        <div className='flex flex-col h-full'>
          <h2 className='text-base font-bold mb-2 text-black line-clamp-1'>
            {product.name}
          </h2>
          <p className='text-slate-600 text-sm mb-2 font-medium'>
            {product.category}
          </p>
          <div className='flex justify-between items-center mt-auto'>
            <p className='text-base font-bold text-blue-500'>
              {product.price} GDS
            </p>
            <Button
              className='rounded-full w-10 h-10 p-0 bg-primary hover:bg-primary/80 text-white transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 bg-gradient-to-r from-[#1488CC] to-[#2B32B2]'
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
