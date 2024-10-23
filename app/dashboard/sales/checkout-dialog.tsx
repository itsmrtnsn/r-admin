'use client';

import useCheckoutModal from '@/app/hooks/use-checkout-modal';
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
import paymentOptions from '@/lib/payment-option';
import { Discount, PaymentMethod } from '@prisma/client';
import { motion } from 'framer-motion';
import { CircleX } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import createSale from '../_actions/create-sale';
import { useCartStore } from './cart-store';
import BarReceipt from './receipt/bar-receipt';
import { Data } from './types/product';

type CheckoutDialogProps = {
  subTotal: number;
  discount?: number;
  discountType?: Discount;
  total: number;
  cashier: string;
  products: Data[];
  onOpen: () => void;
};

export function CheckoutDialog({
  subTotal,
  discount,
  total,
  cashier,
  discountType,
  onOpen,
}: CheckoutDialogProps) {
  const router = useRouter();
  const { clearCart, getTotal, items } = useCartStore();
  const { isOpen, closeModal } = useCheckoutModal();
  const [selectedPaymentOption, setSelectedPaymentOption] =
    useState<PaymentMethod>('cash');
  const [cashReceived, setCashReceived] = useState<number>();
  const [isRoomCharge, setIsRoomCharge] = useState(false);
  const [roomNumber, setRoomNumber] = useState('');
  const [showRoomChargeOptions, setShowRoomChargeOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, SetCompleted] = useState<boolean>(false);
  const [receiptData, setReceiptData] = useState<{
    transactionId: string;
    cashier: string;
    subTotal: number;
    total: number;
    discount: number;
    amountReceieved: number;
    customerChange: number;
  }>();

  const customerChange = () => {
    return cashReceived! - total;
  };

  const handleCompletePayment = async () => {
    if (isRoomCharge && !roomNumber) {
      alert('Please enter a room number');
      return;
    }

    setIsLoading(true); // Set loading to true before creating the sale

    try {
      const { success, data } = await createSale({
        cashier: cashier,
        salesType: 'raw_product',
        paymentMethod: selectedPaymentOption,
        amountReceived: cashReceived!,
        customerChange: customerChange(),
        subTotal: getTotal(),
        total: discount ? getTotal() - discount : getTotal(),
        discountValue: discount,
        discountType: discountType,
        saleItems: [{ productId: 'Grest', quantity: 1, price: 10 }],
      });
      clearCart(); // Clear the cart only upon successful sale creation
      router.refresh();
      if (success) {
        setReceiptData({
          transactionId: data?.reference!,
          cashier: data?.cashier!,
          subTotal: data?.subTotal!,
          total: data?.total!,
          amountReceieved: data?.amountReceived!,
          customerChange: data?.customerChange!,
          discount: data?.discountValue!,
        });
        SetCompleted(true);
      }
    } catch (error) {
      console.error('Error creating sale:', error);
    } finally {
      setIsLoading(false); // Hide spinner after the operation
    }
  };

  const handleCancel = () => {
    setSelectedPaymentOption('cash');
    setCashReceived(0);
    setIsRoomCharge(false);
    setRoomNumber('');
    setShowRoomChargeOptions(false);
    setIsLoading(false);
    SetCompleted(false);
    router.refresh();
    closeModal();
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={items.length <= 0}
          className='w-full rounded-full py-6 font-normal text-base text-white mt-4 bg-gradient-to-r from-blue-500 to-blue-800 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 '
        >
          Passer à la caisse
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[500px]  rounded-2xl border-[0.1px]'>
        <DialogHeader>
          <DialogTitle className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-800 flex items-center justify-between'>
            <span>Caisse</span>
            <CircleX
              onClick={handleCancel}
              className='text-destructive cursor-pointer'
              strokeWidth={1}
            />
          </DialogTitle>
        </DialogHeader>

        <Card className='mt-4 border-[0.1px] bg-transparent shadow-none rounded-lg'>
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
                onValueChange={(option) =>
                  setSelectedPaymentOption(option as unknown as PaymentMethod)
                }
              >
                <SelectTrigger className='col-span-3 shadow-none border-[0.1px]'>
                  <SelectValue placeholder='Sélectionnez le mode de paiement' />
                </SelectTrigger>
                <SelectContent className='border-[0.1px] shadow-none'>
                  {paymentOptions.map((option) => (
                    <SelectItem key={option.id} value={option.value}>
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
                  onChange={(e) => setCashReceived(Number(e.target.value))}
                  placeholder='Entrer le montant'
                  className='col-span-3 border-[0.1px] shadow-none'
                  type='number'
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
            <div className='space-y-3'>
              <div className='flex justify-between  text-gray-700'>
                <span>Sous-total</span>
                <span>${subTotal.toFixed(2)}</span>
              </div>
              <div className='flex justify-between text-lg text-green-600'>
                <span>Discount</span>
                <span>-${discount ? discount.toFixed(2) : 0}</span>
              </div>
              <div className='flex text-base justify-between  text-gray-700'>
                <span>TCA</span>
                <span>$0</span>
              </div>
              <Separator />
              <div className='flex justify-between text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-500'>
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
              <ReceiptButton
                onCancel={handleCancel}
                transactionId={receiptData?.transactionId!}
                cashier={receiptData?.cashier!}
                subTotal={receiptData?.subTotal!}
                total={receiptData?.total!}
                discount={receiptData?.discount!}
                amountReceived={receiptData?.amountReceieved!}
                customerChange={receiptData?.customerChange!}
                paymentMethod={selectedPaymentOption}
              />
            ) : (
              <Button
                className='w-full rounded-full py-6 text-base  text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl font-normal'
                disabled={
                  !selectedPaymentOption ||
                  (selectedPaymentOption === 'cash' && cashReceived! < total) ||
                  (isRoomCharge && !roomNumber)
                }
                onClick={handleCompletePayment}
              >
                {isLoading ? (
                  <p className='flex items-center justify-center gap-4'>
                    <FaSpinner className='animate-spin' />
                    <span>Processing...</span>
                  </p>
                ) : (
                  'Finaliser le paiement'
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

interface Props {
  onCancel: () => void;
  transactionId: string;
  cashier: string;
  subTotal: number;
  discount: number;
  total: number;
  amountReceived: number;
  customerChange: number;
  paymentMethod: PaymentMethod;
}

const ReceiptButton = ({
  onCancel,
  transactionId,
  cashier,
  subTotal,
  discount,
  total,
  amountReceived,
  customerChange,
  paymentMethod,
}: Props) => {
  return (
    <div className='flex justify-between items-center gap-4 w-full'>
      <Button
        variant={'outline'}
        size='lg'
        className='w-full rounded-full py-6 text-base font-normal   transition-all duration-300 shadow-none border-[0.1px]'
        onClick={onCancel}
      >
        <CircleX className='mr-2 w-5 h-5' strokeWidth={1} />
        Annuler
      </Button>
      <BarReceipt
        transactionId={transactionId}
        cashier={cashier}
        items={[]}
        subtotal={subTotal}
        discount={discount}
        total={total}
        amountReceived={amountReceived}
        change={customerChange}
        paymentMethod={paymentMethod}
      />
    </div>
  );
};
