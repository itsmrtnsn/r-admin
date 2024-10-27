'use client';

import CurrentPath from '@/components/curren-path';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import UserAvatar from '@/components/user-avatar';
import CheckOutForm from './check-out-form';
import SaleItems from './sale-item';
import useCheckOutStore from '@/app/hooks/use-checkout-store';
import { useCartStore } from '../cart-store';
import useDiscount from '@/app/hooks/use-discount';

export default function Component() {
  const { amountReceived } = useCheckOutStore();
  const { items, getTotal } = useCartStore();
  const { discountType, discountValue } = useDiscount();

  return (
    <div className='grid grid-cols-[1fr_auto] gap-4 overflow-hidden rounded-lg p-4'>
      <Card className=' border-[0.1px] shadow-none rounded-xl'>
        <CardContent>
          <div className='mt-4 mb-8 flex items-center justify-between'>
            <CurrentPath />
            <UserAvatar fallback={'mo'} />
          </div>
          <div className=''>
            <CheckOutForm />
          </div>
        </CardContent>
      </Card>
      <div className='w-[22rem] border-[0.1px] rounded-xl p-4 flex flex-col'>
        <div className='flex-1 p-2 '>
          <h3 className='text-2xl  font-semibold text-primary mb-6'>
            Articles de vente
          </h3>
          <SaleItems items={items} />
        </div>
        <div className='bg-gray-50 p-4 rounded-xl'>
          <div className='mt-6 space-y-4'>
            <div className='flex justify-between text-sm'>
              <span className=''>Subtotal</span>
              <span className='font-medium text-gray-800'>${getTotal()}</span>
            </div>
            <div className='flex justify-between text-sm text-green-500 font-medium'>
              <span className=''>Rabais</span>
              <span>${discountValue}</span>
            </div>
            <div className='flex justify-between text-sm font-medium'>
              <span className=''>TCA</span>
              <span>${0}</span>
            </div>
            <div className='flex justify-between text-sm font-medium'>
              <span className=''>Total</span>
              <span>${0}</span>
            </div>
            <Separator className='border-gray-200' />
            <div className='flex justify-between text-base font-bold'>
              <span className='text-gray-800'>Change</span>
              <span className='text-gray-800'>${100}</span>
            </div>
          </div>
          <Button
            className='w-full mt-8 bg-primary rounded-full font-normal hover:bg-blue-700 transition-colors ease-linear duration-300 text-white'
            size='lg'
            // onClick={handleCheckout}
            type='submit'
          >
            Complete Purchase
          </Button>
        </div>
      </div>
    </div>
  );
}
