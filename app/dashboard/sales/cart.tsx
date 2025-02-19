'use client';

import useCheckoutModal from '@/app/hooks/use-checkout-modal';
import useDiscount, { Discount } from '@/app/hooks/use-discount';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { discountFormSchema } from '../_schema/discount-form-schema';
import { DiscountFormData } from '../_types/discount-form-data';
import CartItem from './cart-item';
import { useCartStore } from './cart-store';
import { CheckoutDialog } from './checkout-dialog';

const Cart = () => {
  const { openModal } = useCheckoutModal();
  const { items, getTotal } = useCartStore();

  const [isClient, setIsClient] = useState(false);
  const { discountType, setDiscountType, setDiscountValue, calculateDiscount } =
    useDiscount();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const subtotal = getTotal();

  const discount = calculateDiscount(subtotal);
  const total = Math.max(subtotal - discount, 0);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DiscountFormData>({
    resolver: zodResolver(discountFormSchema),
  });

  return (
    <Card className='h-[calc(100vh-4rem)] flex flex-col p-0   border-none shadow-none '>
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
              {...register('discountValue', { valueAsNumber: true })}
              // value={discountValue}
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
            <div className=''>
              {errors.discountValue && (
                <p className='text-xs text-destructive animate-pulse'>
                  {errors.discountValue?.message}
                </p>
              )}
              {errors.discountType && (
                <p className='text-xs text-destructive animate-pulse'>
                  {errors.discountType?.message}
                </p>
              )}
            </div>
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
            total={total}
            cashier={'Mortensen Ulysse'}
          />
        </div>
        <Link href='/dashboard/sales/checkout'>Checkout</Link>
      </CardContent>
    </Card>
  );
};

export default Cart;
