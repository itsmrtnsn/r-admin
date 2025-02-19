import { Button } from '@/components/ui/button';
import { Delete, Minus, Plus } from 'lucide-react';
import { CartItem as CartItemType, useCartStore } from './cart-store';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { removeItem, updateQuantity } = useCartStore();

  return (
    <div
      key={item.product.id}
      className='border-[0.1px] rounded-lg  bg-slate-50  p-3 mb-2 transition-all duration-300 '
    >
      <div className='flex items-center justify-between'>
        <h4 className='font-medium text-black  text-xs truncate max-w-[60%]'>
          {item.product.name}
        </h4>
        <p
          className='font-medium text-xs text-destructive ml-2 cursor-pointer hover:text-red-800'
          onClick={() => removeItem(item.product.id)}
        >
          <Delete strokeWidth={1} />
        </p>
      </div>
      <div className='flex items-center justify-between mt-3'>
        <div className='flex items-center font-medium text-sm text-primary'>
          <p> {item.product.price}</p> <span className='mx-1'>x</span>{' '}
          <p>{item.quantity}</p>
        </div>

        <div className='flex items-center space-x-1 border-[0.1px] bg-white rounded-full px-1 py-0.5'>
          <Button
            size='icon'
            variant='outline'
            className='rounded-full h-6 w-6 bg-slate-500  hover:bg-slate-700'
            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
          >
            <Minus className='h-3 w-3 text-white' />
          </Button>
          <span className='w-6 text-center font-medium text-primary text-sm'>
            {item.quantity}
          </span>
          <Button
            size='icon'
            variant='outline'
            className='rounded-full h-6 w-6 bg-slate-500 hover:bg-slate-700'
            disabled={item.quantity >= item.product.quantityInStock}
            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
          >
            <Plus className='h-3 w-3 text-white' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
