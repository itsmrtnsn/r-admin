import { Button } from '@/components/ui/button';
import { Minus, Plus, X } from 'lucide-react';
import { CartItem as CartItemType, useCartStore } from './cart-store';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { removeItem, updateQuantity } = useCartStore();

  return (
    <div key={item.product.id} className='bg-accent rounded-lg p-4 shadow-sm'>
      <div className='flex items-center justify-between mb-2'>
        <h4 className='font-medium text-lg'>{item.product.name}</h4>
        <Button
          size='icon'
          variant='ghost'
          onClick={() => removeItem(item.product.id)}
        >
          <X className='h-4 w-4' />
        </Button>
      </div>
      <div className='flex justify-between items-center'>
        <p className='text-primary font-bold'>
          ${(item.product.price * item.quantity).toFixed(2)}
        </p>
        <div className='flex items-center space-x-2 bg-background rounded-full shadow-inner p-1'>
          <Button
            size='icon'
            variant='ghost'
            className='rounded-full h-8 w-8'
            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
          >
            <Minus className='h-4 w-4' />
          </Button>
          <span className='w-8 text-center'>{item.quantity}</span>
          <Button
            size='icon'
            variant='ghost'
            className='rounded-full h-8 w-8'
            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
          >
            <Plus className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
