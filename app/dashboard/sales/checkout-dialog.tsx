'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { FaSpinner } from 'react-icons/fa';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import paymentOptions from '@/lib/payment-option';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import createSale from '../_actions/create-sale';
import { useCartStore } from './cart-store';
import { Data } from './types/product';

// Assuming you have a Spinner component

type CheckoutDialogProps = {
  subTotal: number;
  discount: number;
  total: number;
  transactionId: string;
  cashier: string;
  products: Data[];
};

export function CheckoutDialog({
  subTotal,
  discount,
  total,
  transactionId,
  cashier,
}: CheckoutDialogProps) {
  const router = useRouter();
  const { clearCart, getTotal, items } = useCartStore();

  const [selectedPaymentOption, setSelectedPaymentOption] =
    useState<string>('cash');
  const [cashReceived, setCashReceived] = useState<number>(0);
  const [isRoomCharge, setIsRoomCharge] = useState(false);
  const [roomNumber, setRoomNumber] = useState('');
  const [showRoomChargeOptions, setShowRoomChargeOptions] = useState(false);
  const [showReceiptDialog, setShowReceiptDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, SetCompleted] = useState<boolean>(false);

  const customerChange = () => {
    return cashReceived - total;
  };

  const handleCompletePayment = async () => {
    if (isRoomCharge && !roomNumber) {
      alert('Please enter a room number');
      return;
    }

    setIsLoading(true); // Set loading to true before creating the sale

    try {
      const { success, data } = await createSale({
        paymentMethod: 'credit_card', // Use the selected payment option
        salesType: 'raw_product',
        amountReceived: cashReceived,
        customerChange: customerChange(),
        saleAmount: getTotal(),
        cashier: cashier, // Use the cashier prop
      });
      // Clear the cart only upon successful sale creation
      clearCart();
      router.refresh();
      if (success) {
        SetCompleted(true);
      }
      // setShowReceiptDialog(true);
    } catch (error) {
      console.error('Error creating sale:', error);
    } finally {
      setIsLoading(false); // Hide spinner after the operation
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={items.length <= 0}
          className='w-full rounded-full py-6 font-normal text-lg text-white mt-4 bg-gradient-to-r from-blue-500 to-blue-800 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl'
        >
          Checkout
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[450px]  rounded-2xl border-[0.1px]'>
        <DialogHeader>
          <DialogTitle className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-800'>
            Checkout
          </DialogTitle>
        </DialogHeader>

        <Card className='mt-4 border-none bg-transparent shadow-lg'>
          <CardContent className='space-y-6 pt-6'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label
                htmlFor='payment-method'
                className='text-right font-medium text-muted-foreground'
              >
                Mode de paiement
              </Label>
              <Select
                defaultValue='cash'
                onValueChange={(option) => setSelectedPaymentOption(option)}
              >
                <SelectTrigger className='col-span-3 border-[0.1px]'>
                  <SelectValue placeholder='Sélectionnez le mode de paiement' />
                </SelectTrigger>
                <SelectContent className='bg-[#0a0a0a] border-[0.1px]'>
                  {paymentOptions.map((option) => (
                    <SelectItem
                      key={option.id}
                      value={option.value}
                      className='text-gray-700'
                    >
                      <div className='flex items-center'>
                        <option.icon className='mr-2 h-4 w-4' />
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
                className='grid grid-cols-4 items-center gap-4'
              >
                <Label
                  htmlFor='cash-received'
                  className='text-right font-medium text-muted-foreground'
                >
                  Cash reçue
                </Label>
                <Input
                  id='cash-received'
                  value={cashReceived}
                  onChange={(e) => setCashReceived(parseFloat(e.target.value))}
                  placeholder='Entrer le montant'
                  className='col-span-3 border-[0.1px]'
                  type='number'
                  step='0.01'
                />
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
              <Label htmlFor='room-charge'>Facture à la chambre</Label>
            </div>
            {showRoomChargeOptions && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className='grid grid-cols-4 items-center gap-4'
              >
                <Label
                  htmlFor='room-number'
                  className='text-right font-medium text-gray-700'
                >
                  Numéro de chambre
                </Label>
                <Input
                  id='room-number'
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  placeholder='Entrez le numéro de chambre'
                  className='col-span-3 border-[0.1px]'
                />
              </motion.div>
            )}
            <Separator className='bg-muted' />
            <div className='space-y-2'>
              <div className='flex justify-between text-lg text-gray-700'>
                <span>Sous-total</span>
                <span>${subTotal.toFixed(2)}</span>
              </div>
              <div className='flex justify-between text-lg text-green-600'>
                <span>Discount</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
              <Separator className='bg-muted' />
              <div className='flex justify-between text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-500'>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            {selectedPaymentOption === 'cash' && cashReceived && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className='flex justify-between text-lg font-semibold'
              >
                <span>Monnaie</span>
                <span>${customerChange()}</span>
              </motion.div>
            )}
          </CardContent>
          <CardFooter>
            {isCompleted ? (
              <ReceiptButton />
            ) : (
              <Button
                className='w-full rounded-full py-6 text-lg  text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl font-normal'
                disabled={
                  !selectedPaymentOption ||
                  (selectedPaymentOption === 'cash' &&
                    (cashReceived ?? 0) < total) ||
                  (isRoomCharge && !roomNumber)
                }
                onClick={handleCompletePayment}
              >
                {isLoading ? (
                  <p className='flex items-center justify-center gap-4'>
                    <FaSpinner className='animate-spin' />
                    <span>En cours...</span>
                  </p>
                ) : (
                  'Valider le paiement'
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

const ReceiptButton = () => {
  const router = useRouter();
  return (
    <div className='flex justify-between items-center gap-4 w-full'>
      <Button
        variant={'outline'}
        size='lg'
        className='w-full rounded-full py-6 text-lg  text-white bg-gradient-to-r  transition-all duration-300 shadow-lg hover:shadow-xl font-normal'
        onClick={() => {
          router.refresh();
          router.replace('/dashboard/sales');
        }}
      >
        Cancel
      </Button>
      <Button className='w-full rounded-full py-6 text-lg  text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl font-normal'>
        Print Receipt
      </Button>
    </div>
  );
};
