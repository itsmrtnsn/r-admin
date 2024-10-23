'use client';

import useCheckoutModal from '@/app/hooks/use-checkout-modal';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Discount } from '@prisma/client';
import { useEffect, useState } from 'react';
import CartItem from './cart-item';
import { useCartStore } from './cart-store';
import { CheckoutDialog } from './checkout-dialog';

const Cart = () => {
  const { openModal } = useCheckoutModal();
  const { items, getTotal } = useCartStore();
  const [discountType, setDiscountType] = useState<Discount>();
  const [discountValue, setDiscountValue] = useState<number>();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const subtotal = getTotal();

  const calculateDiscount = () => {
    if (!discountValue) return 0;
    const value = discountValue;
    if (isNaN(value)) return 0;
    return discountType === 'PERCENTAGE' ? (subtotal * value) / 100 : value;
  };

  const discount = calculateDiscount();
  const total = Math.max(subtotal - discount, 0);

  return (
    <Card className='h-[calc(100vh-4rem)] flex flex-col p-0  border-none shadow-none '>
      <CardContent className='p-0 flex flex-col h-full pb-2'>
        <div className='flex-grow overflow-auto mb-0  px-4 pt-3'>
          {items.map((item) => (
            <div key={item.product.id} className='mb-4'>
              <CartItem item={item} />
            </div>
          ))}
        </div>

        {/* summary */}
        <div className='space-y-4 mt-auto p-4 pb-2'>
          <div className='flex justify-between text-base font-semibold'>
            <span>Sous-total</span>
            <span>${isClient ? subtotal.toFixed(2) : '0.00'}</span>
          </div>
          <div className='flex items-center space-x-2'>
            <Select
              value={discountType}
              onValueChange={(value: Discount) => setDiscountType(value)}
            >
              <SelectTrigger className='w-1/2 rounded-l-full shadow-none border-[0.1px]'>
                <SelectValue placeholder='Discount' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='PERCENTAGE'>Pourcentage</SelectItem>
                <SelectItem value='FIXED'>Montant fixe</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type='number'
              onChange={(e) =>
                setDiscountValue(parseFloat(e.currentTarget.value))
              }
              placeholder={
                discountType === 'PERCENTAGE'
                  ? 'Entrez le %'
                  : 'Entrez le montant'
              }
              className='w-1/2 rounded-r-full shadow-none border-[0.1px]'
            />
          </div>
          <div className='flex justify-between text-base font-semibold text-green-600'>
            <span>Rabais</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
          <div className='flex justify-between text-base font-bold text-primary'>
            <span>Total</span>
            <span>${isClient ? total.toFixed(2) : '0.00'}</span>
          </div>
          <CheckoutDialog
            onOpen={openModal}
            subTotal={subtotal}
            discount={discountValue}
            total={total}
            cashier={'Mortensen Ulysse'}
            products={[]}
            discountType={discountType}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Cart;
