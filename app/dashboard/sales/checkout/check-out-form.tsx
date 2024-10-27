'use client';

import useCheckOutStore from '@/app/hooks/use-checkout-store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import paymentOptions from '@/lib/payment-option';
import { PaymentMethod } from '@prisma/client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import AmountInput from '../../customers/amount-input';
import { CustomerCombobox } from '../../customers/customer-combobox';
import NewCustomerDialog from '../../customers/new-customer-form-dialog';

const CheckOutForm = () => {
  const [selectedPaymentOption, setSelectedPaymentOption] =
    useState<PaymentMethod>('cash');
  const [amountReceived, setAmountReceived] = useState<number>(0);
  const [category, setCategory] = useState<'room' | 'other'>('other');
  const [roomNumber, setRoomNumber] = useState<number | undefined>(undefined);
  const [showRoomChargeOptions, setShowRoomChargeOptions] = useState(false);

  const {
    setAmountReceived: setStoreAmountReceived,
    setCategory: setStoreCategory,
    setRoomNumber: setStoreRoomNumber,
  } = useCheckOutStore();

  // Update store whenever amountReceived, category, or roomNumber changes
  useEffect(() => {
    setStoreAmountReceived(amountReceived);
  }, [amountReceived, setStoreAmountReceived]);

  useEffect(() => {
    setStoreCategory(category);
  }, [category, setStoreCategory]);

  useEffect(() => {
    setStoreRoomNumber(roomNumber);
  }, [roomNumber, setStoreRoomNumber]);

  const handlePaymentMethodChange = (value: PaymentMethod) => {
    setSelectedPaymentOption(value);
  };

  const handleRoomChargeChange = (checked: boolean) => {
    const newCategory = checked ? 'room' : 'other';
    setCategory(newCategory);
    setShowRoomChargeOptions(checked);
  };

  return (
    <form className='space-y-6' onSubmit={(e) => e.preventDefault()}>
      <div className='space-y-2'>
        <Label htmlFor='payment-method'>Mode de paiement</Label>
        <Select
          value={selectedPaymentOption}
          onValueChange={(value) => {
            handlePaymentMethodChange(value as PaymentMethod);
          }}
        >
          <SelectTrigger className='col-span-3 shadow-none border-[0.1px] h-10 border-slate-300'>
            <SelectValue placeholder='Sélectionnez le mode de paiement' />
          </SelectTrigger>

          <SelectContent className='border-[0.1px] shadow-none'>
            {paymentOptions.map((option) => (
              <SelectItem key={option.id} value={option.value}>
                <div className='flex items-center'>
                  <option.icon className='mr-2 h-4 w-4 text-primary' />
                  {option.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedPaymentOption === 'cash' && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className='space-y-2'
        >
          <AmountInput
            value={amountReceived}
            onChange={(value: number) => {
              setAmountReceived(value);
            }}
          />
        </motion.div>
      )}

      <div className='flex items-center space-x-2'>
        <Switch
          id='room-charge'
          checked={category === 'room'}
          onCheckedChange={handleRoomChargeChange}
        />
        <Label htmlFor='room-charge'>Chambre</Label>
      </div>

      {showRoomChargeOptions && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className='space-y-2'
        >
          <div className='space-y-2'>
            <Label htmlFor='input-02'>
              Numéro de chambre
              <span className='text-destructive'>*</span>
            </Label>
            <Input
              id='input-02'
              placeholder='Entrez le numéro de la chambre'
              type='number'
              className='border-[0.1px] border-slate-300 shadow-none h-10'
              onChange={(e) => {
                const value = e.target.value
                  ? Number(e.target.value)
                  : undefined;
                setRoomNumber(value);
              }}
            />
          </div>
        </motion.div>
      )}

      <div className='flex items-center gap-4'>
        <CustomerCombobox />
        <NewCustomerDialog />
      </div>
    </form>
  );
};

export default CheckOutForm;
