import { Percent } from 'lucide-react';
import React from 'react';
import { receiptData } from './data';

interface Prop {
  subTotal: number;
  discount: number;
  tax: number;
  total: number;
}

const TotalSection = ({ subTotal, discount, tax, total }: Prop) => {
  return (
    <div className='space-y-1 text-xs text-gray-900 mb-3'>
      <div className='flex justify-between'>
        <span>Sous-total:</span>
        <span>{subTotal} G</span>
      </div>
      <div className='flex justify-between'>
        <span className='flex items-center'>
          <Percent className='w-3 h-3 mr-1 text-gray-900' />
          discount:
        </span>
        <span>-{discount}G</span>
      </div>
      <div className='flex justify-between'>
        <span>TVA:</span>
        <span>{tax} G</span>
      </div>
      <div className='flex justify-between font-bold text-sm mt-2 text-black'>
        <span>Total:</span>
        <span>{total} G</span>
      </div>
    </div>
  );
};

export default TotalSection;
