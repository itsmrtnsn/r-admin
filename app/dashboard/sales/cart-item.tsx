import { Button } from '@/components/ui/button';
import { Minus, Plus, X } from 'lucide-react';
import { CartItem as CartItemType, useCartStore } from './cart-store';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { removeItem, updateQuantity } = useCartStore();

  return (
    <div
      key={item.product.id}
      className='border-none rounded-lg border-gray-700  px-4 mb-2 transition-all duration-300 '
    >
      <div className='flex items-center justify-between'>
        <h4 className='font-medium  text-sm truncate max-w-[60%]'>
          {item.product.name}
        </h4>
      </div>
      <div className='flex items-center justify-between mt-2'>
        <div className='flex items-center font-semibold text-sm text-blue-500'>
          <p> {item.product.price}</p> <span>x</span> <p>{item.quantity}</p>
          <p
            className='font-medium text-xs text-red-500 ml-2 cursor-pointer hover:text-red-800'
            onClick={() => removeItem(item.product.id)}
          >
            remove
          </p>
        </div>

        <div className='flex items-center space-x-1 border-[0.1px] border-gray-400 rounded-full px-1 py-0.5'>
          <Button
            size='icon'
            variant='ghost'
            className='rounded-full h-6 w-6 hover:bg-gray-600'
            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
          >
            <Minus className='h-3 w-3 text-blue-400' />
          </Button>
          <span className='w-6 text-center font-medium text-primary text-sm'>
            {item.quantity}
          </span>
          <Button
            size='icon'
            variant='ghost'
            className='rounded-full h-6 w-6 hover:bg-gray-600'
            disabled={item.quantity >= item.product.quantityInStock}
            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
          >
            <Plus className='h-3 w-3 text-blue-400' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
