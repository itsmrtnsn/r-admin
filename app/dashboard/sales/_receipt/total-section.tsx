import { Percent } from 'lucide-react';
import React from 'react';
import { receiptData } from './data';

const TotalSection = () => {
  return (
    <div className='space-y-1 text-xs text-gray-900 mb-3'>
      <div className='flex justify-between'>
        <span>Sous-total:</span>
        <span>{receiptData.subtotal.toLocaleString('fr-FR')} G</span>
      </div>
      <div className='flex justify-between'>
        <span className='flex items-center'>
          <Percent className='w-3 h-3 mr-1 text-gray-900' />
          Remise:
        </span>
        <span>-{receiptData.discount.toLocaleString('fr-FR')} G</span>
      </div>
      <div className='flex justify-between'>
        <span>TVA:</span>
        <span>{receiptData.tax.toLocaleString('fr-FR')} G</span>
      </div>
      <div className='flex justify-between font-bold text-sm mt-2 text-black'>
        <span>Total:</span>
        <span>{receiptData.total.toLocaleString('fr-FR')} G</span>
      </div>
    </div>
  );
};

export default TotalSection;
