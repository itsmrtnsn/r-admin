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
import { useState } from 'react';
import { Data } from './types/product';
import { useCartStore } from './cart-store';
import BarReceipt from './_receipt/bar-receipt';
import PrintReceipt from './print-receipt';
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
  const { clearCart, getTotal } = useCartStore();

  const [selectedPaymentOption, setSelectedPaymentOption] =
    useState<string>('cash');
  const [cashReceived, setCashReceived] = useState<number>();
  const [showReceipt, setShowReceipt] = useState(false);
  const [isRoomCharge, setIsRoomCharge] = useState(false);
  const [roomNumber, setRoomNumber] = useState('');
  const [showRoomChargeOptions, setShowRoomChargeOptions] = useState(false);
  const [showReceiptDialog, setShowReceiptDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to manage loading spinner

  const customerChange = (cashReceived || 0) - total;

  const handleCompletePayment = async () => {
    if (isRoomCharge && !roomNumber) {
      alert('Please enter a room number');
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false); // Hide spinner
    clearCart();

    setShowReceiptDialog(true);
  };

  const handlePrintReceipt = () => {
    setShowReceiptDialog(false);
    setShowReceipt(true);
  };

  const handleCancelReceipt = () => {
    setShowReceiptDialog(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={!getTotal()}
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
                <span>${Math.max(cashReceived - total, 0).toFixed(2)}</span>
              </motion.div>
            )}
          </CardContent>
          <CardFooter>
            {!showReceiptDialog && (
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
            {showReceiptDialog && <PrintReceipt />}
          </CardFooter>
        </Card>
      </DialogContent>

      {/* Receipt Dialog */}
      {/* <Dialog open={showReceiptDialog} onOpenChange={setShowReceiptDialog}>
        <DialogContent className='sm:max-w-[400px] bg-[#0a0a0a] rounded-2xl border-[0.1px]'>
          <DialogHeader>
            <DialogTitle className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-800'>
              Receipt
            </DialogTitle>
          </DialogHeader>
          <div className='space-y-4'>
            <p>Transaction ID: {transactionId}</p>
            <p>Cashier: {cashier}</p>
            <p>Total: ${total.toFixed(2)}</p>
            <p>Change: ${Math.max(cashReceived ?? 0 - total, 0).toFixed(2)}</p>
            <BarReceipt
              transactionId={''}
              cashier={''}
              items={[]}
              subtotal={0}
              discount={0}
              total={0}
              amountReceived={0}
              change={0}
              paymentMethod={''}
            />
          </div>
          <CardFooter>
            <Button
              className='w-full rounded-full py-6 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl'
              onClick={handlePrintReceipt}
            >
              Print Receipt
            </Button>
            <Button
              className='w-full rounded-full py-6 text-lg font-semibold text-gray-500 bg-gray-200 hover:bg-gray-300 transition-all duration-300'
              onClick={handleCancelReceipt}
            >
              Cancel
            </Button>
          </CardFooter>
        </DialogContent>
      </Dialog> */}
    </Dialog>
  );
}
