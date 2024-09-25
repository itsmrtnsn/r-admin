'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import CartItem from './cart-item';
import { useCartStore } from './cart-store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Cart = () => {
  const { items, getTotal } = useCartStore();
  return (
    <Card className='h-[calc(83vh-64px)] flex flex-col  border-[0.1px] border-slate-200 dark:border-slate-700 shadow-none'>
      <CardContent className='pt-4 flex flex-col h-full'>
        <div className='flex-grow overflow-auto mb-4'>
          {items.map((item) => (
            <div key={item.product.id} className='mb-4'>
              <CartItem item={item} />
            </div>
          ))}
        </div>
        {/* summary */}
        <div className='space-y-4 mt-auto'>
          <div className='flex justify-between text-lg font-semibold'>
            <span>Subtotal</span>
            <span>${getTotal().toFixed(2)}</span>
          </div>
          {/* <div className='flex items-center space-x-2'>
          <Select
            value={discountType}
            onValueChange={(value: 'percentage' | 'amount') =>
              setDiscountType(value)
            }
          >
            <SelectTrigger className='w-1/2 rounded-l-full'>
              <SelectValue placeholder='Discount Type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='percentage'>Percentage</SelectItem>
              <SelectItem value='amount'>Amount</SelectItem>
            </SelectContent>
          </Select> */}
          {/* <Input
            value={discountValue}
            onChange={(e) => setDiscountValue(e.target.value)}
            placeholder={
              discountType === 'percentage' ? 'Enter %' : 'Enter amount'
            }
            className='w-1/2 rounded-r-full'
          /> */}
        </div>
        <div className='flex justify-between text-lg font-semibold text-green-600'>
          <span>Discount</span>
          {/* <span>-${calculateDiscount().toFixed(2)}</span> */}
        </div>
        <div className='flex justify-between text-xl font-bold text-primary'>
          <span>Total</span>
          {/* <span>${calculateTotal().toFixed(2)}</span> */}
        </div>
        <Button
          // onClick={() => setIsCheckoutOpen(true)}
          className='w-full rounded-md py-6 text-lg font-semibold text-white mt-4'
        >
          Proceed to Checkout
        </Button>
      </CardContent>
    </Card>
  );
};

export default Cart;
