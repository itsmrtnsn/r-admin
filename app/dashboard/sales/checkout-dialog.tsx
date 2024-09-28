import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
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
import { motion } from 'framer-motion';
import { CreditCard, DollarSign, FileText, Smartphone } from 'lucide-react';
import { useState } from 'react';
import MagicStudioReceipt from './_receipt/bar-receipt';
import { Data } from './types/product';

type CheckoutDialogProps = {
  subTotal: number;
  discount: number;
  total: number;
  transactionId: string;
  cashier: string;
  products: Data[];
};

const paymentOptions = [
  { id: 1, name: 'Cash', value: 'cash', icon: DollarSign },
  { id: 2, name: 'Credit Card', value: 'credit_card', icon: CreditCard },
  { id: 3, name: 'Mobile Payment', value: 'mobile_payment', icon: Smartphone },
  { id: 4, name: 'Check', value: 'check', icon: FileText },
];

export function CheckoutDialog({
  subTotal,
  discount,
  total,
  transactionId,

  cashier,
}: CheckoutDialogProps) {
  const [selectedPaymentOption, setSelectedPaymentOption] =
    useState<string>('cash');
  const [cashReceived, setCashReceived] = useState<number>();
  const [showReceipt, setShowReceipt] = useState(false);
  const [isRoomCharge, setIsRoomCharge] = useState(false);
  const [roomNumber, setRoomNumber] = useState('');
  const [showRoomChargeOptions, setShowRoomChargeOptions] = useState(false);
  const [showReceiptDialog, setShowReceiptDialog] = useState(false);

  const customerChange = cashReceived || 0 - total;

  const handleCompletePayment = () => {
    if (isRoomCharge && !roomNumber) {
      alert('Please enter a room number');
      return;
    }
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
        <Button className='w-full rounded-full py-6 font-normal text-lg text-white mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl'>
          Proceed to Checkout
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[550px] bg-white rounded-2xl'>
        <DialogHeader>
          <DialogTitle className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600'>
            Checkout
          </DialogTitle>
        </DialogHeader>
        {!showReceipt ? (
          <Card className='mt-4 border-none shadow-lg'>
            <CardContent className='space-y-6 pt-6'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label
                  htmlFor='payment-method'
                  className='text-right font-medium text-gray-700'
                >
                  Payment Method
                </Label>
                <Select
                  defaultValue='cash'
                  onValueChange={(option) => setSelectedPaymentOption(option)}
                >
                  <SelectTrigger className='col-span-3 bg-gray-100 border-gray-200'>
                    <SelectValue placeholder='Select payment method' />
                  </SelectTrigger>
                  <SelectContent className='bg-white border-gray-200'>
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
                    className='text-right font-medium text-gray-700'
                  >
                    Cash Received
                  </Label>
                  <Input
                    id='cash-received'
                    value={cashReceived}
                    onChange={(e) =>
                      setCashReceived(parseFloat(e.target.value))
                    }
                    placeholder='Enter amount'
                    className='col-span-3 bg-gray-100 border-gray-200'
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
                <Label htmlFor='room-charge'>Charge to Room</Label>
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
                    Room Number
                  </Label>
                  <Input
                    id='room-number'
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    placeholder='Enter room number'
                    className='col-span-3 bg-gray-100 border-gray-200'
                  />
                </motion.div>
              )}
              <Separator className='bg-gray-200' />
              <div className='space-y-2'>
                <div className='flex justify-between text-lg text-gray-700'>
                  <span>Subtotal</span>
                  <span>${subTotal.toFixed(2)}</span>
                </div>
                <div className='flex justify-between text-lg text-green-600'>
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
                <Separator className='bg-gray-200' />
                <div className='flex justify-between text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600'>
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              {selectedPaymentOption === 'cash' && cashReceived && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className='flex justify-between text-lg font-semibold text-blue-600'
                >
                  <span>Change</span>
                  <span>${Math.max(cashReceived - total, 0).toFixed(2)}</span>
                </motion.div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                className='w-full rounded-full py-6 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl'
                disabled={
                  !selectedPaymentOption ||
                  (selectedPaymentOption === 'cash' &&
                    (cashReceived ?? 0) < total) ||
                  (isRoomCharge && !roomNumber)
                }
                onClick={handleCompletePayment}
              >
                Complete Payment
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <MagicStudioReceipt
            transactionId={transactionId}
            cashier={cashier}
            items={[]}
            subtotal={subTotal}
            discount={discount}
            total={total}
            amountReceived={cashReceived!}
            change={customerChange}
            paymentMethod={selectedPaymentOption}
          />
        )}
      </DialogContent>
      {showReceiptDialog && (
        <Dialog open={showReceiptDialog} onOpenChange={setShowReceiptDialog}>
          <DialogContent className='sm:max-w-[400px] bg-white rounded-2xl'>
            <DialogHeader>
              <DialogTitle className='text-2xl font-bold text-center'>
                Payment Completed
              </DialogTitle>
            </DialogHeader>
            <div className='flex justify-center space-x-4 mt-6'>
              <Button
                onClick={handlePrintReceipt}
                className='bg-blue-500 hover:bg-blue-600 text-white'
              >
                Print Receipt
              </Button>
              <Button
                onClick={handleCancelReceipt}
                className='bg-gray-300 hover:bg-gray-400 text-gray-800'
              >
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  );
}
