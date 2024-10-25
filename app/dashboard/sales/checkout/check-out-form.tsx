'use client';

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
import { useState } from 'react';
import AmountInput from '../../customers/amount-input';
import { CustomerCombobox } from '../../customers/customer-combobox';
import NewCustomerDialog from '../../customers/new-customer-form-dialog';
import Input46 from '../../customers/phone-number-input';
import ClientRegistration from '../../customers/new-customer-form-dialog';

const CheckOutForm = () => {
  const [selectedPaymentOption, setSelectedPaymentOption] =
    useState<PaymentMethod>('cash');
  const [cashReceived, setCashReceived] = useState<number>(0);
  const [isRoomCharge, setIsRoomCharge] = useState(false);
  const [roomNumber, setRoomNumber] = useState('');
  const [showRoomChargeOptions, setShowRoomChargeOptions] = useState(false);

  return (
    <form className='space-y-6'>
      <div className='space-y-2'>
        <Label htmlFor='payment-method' className=''>
          Mode de paiement
        </Label>
        <Select
          defaultValue='cash'
          onValueChange={(value: PaymentMethod) =>
            setSelectedPaymentOption(value)
          }
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
          <AmountInput />
        </motion.div>
      )}

      <div className='flex items-center space-x-2'>
        <Switch
          id='room-charge'
          checked={isRoomCharge}
          onCheckedChange={(checked) => {
            setIsRoomCharge(checked);
            setShowRoomChargeOptions(checked);
          }}
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
          {/* <Label htmlFor='room-number' className='text-right  '>
            Numéro de chambre
          </Label> */}
          {/* <Input
            id='room-number'
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            placeholder='Entrez le numéro de chambre'
            className='col-span-3 border-[0.1px] border-slate-300 shadow-none h-10'
          /> */}
          <div className='space-y-2'>
            <Label htmlFor='input-02'>
              Numéro de chambre
              <span className='text-destructive'>*</span>
            </Label>
            <Input
              id='input-02'
              placeholder='Entrez le numéro de la chambre'
              type='number'
              required
              className='border-[0.1px] border-slate-300 shadow-none'
            />
          </div>
        </motion.div>
      )}

      <div className='flex items-center gap-4'>
        <CustomerCombobox />
        {/* <NewCustomerDialog /> */}
        <NewCustomerDialog />
      </div>

      {/* <div className='space-y-2'>
        <Label
          htmlFor='phone-number'
          className='text-right text-muted-foreground'
        >
          Numéro de téléphone
        </Label>
        <Input46 />
      </div> */}
    </form>
  );
};

export default CheckOutForm;
