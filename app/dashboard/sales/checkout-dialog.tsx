'use client';

import useCheckoutModal from '@/app/hooks/use-checkout-modal';
import useDiscount from '@/app/hooks/use-discount'; // Import the useDiscount hook
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
import { PaymentMethod } from '@prisma/client';
import { motion } from 'framer-motion';
import { CircleX } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'sonner';
import createSale from '../_actions/create-sale';
import { SalesItem } from '../_types/salesItem';
import { useCartStore } from './cart-store';
import BarReceipt from './receipt/bar-receipt';

type CheckoutDialogProps = {
  subTotal: number;
  total: number;
  cashier: string;
  onOpen: () => void;
};

export function CheckoutDialog({
  subTotal,
  total,
  cashier,
  onOpen,
}: CheckoutDialogProps) {
  const router = useRouter();
  const { clearCart, getTotal, items } = useCartStore();
  const { isOpen, closeModal } = useCheckoutModal();
  const { calculateDiscount, resetDiscount, discountPercentage } =
    useDiscount();
  const [selectedPaymentOption, setSelectedPaymentOption] =
    useState<PaymentMethod>('cash');
  const [cashReceived, setCashReceived] = useState<number>(0);
  const [isRoomCharge, setIsRoomCharge] = useState(false);
  const [roomNumber, setRoomNumber] = useState('');
  const [showRoomChargeOptions, setShowRoomChargeOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setCompleted] = useState<boolean>(false);
  const [receiptData, setReceiptData] = useState<{
    transactionId: string;
    cashier: string;
    subTotal: number;
    total: number;
    discount: number;
    amountReceived: number;
    customerChange: number;
    items: SalesItem[];
  } | null>(null);

  const customerChange = () => cashReceived - total;
  const discountValue = calculateDiscount(subTotal);

  const handleCompletePayment = async () => {
    if (isRoomCharge && !roomNumber) {
      return alert('Veuillez entrer le numéro de la chambre');
    }

    setIsLoading(true);
    try {
      const { success, saleData, saleItemData, message } = await createSale(
        {
          cashier,
          paymentMethod: selectedPaymentOption,
          amountReceived: cashReceived,
          customerChange: customerChange(),
          subTotal: getTotal(),
          total: getTotal() - discountValue, // Use the discount value
          discount: discountValue,
        },
        items.map(({ product, quantity }) => {
          const discountAmount = (product.price * discountPercentage) / 100;
          const sellingPrice = product.price - discountAmount;
          return {
            productId: product.id,
            quantity,
            unitPrice: product.price,
            sellingPrice: sellingPrice, // Use the calculated selling price
            totalCost: quantity * sellingPrice,
          };
        })
      );
      if (success) {
        clearCart();
        router.refresh();
        setReceiptData({
          transactionId: saleData?.reference!,
          cashier: saleData?.cashier!,
          subTotal: saleData?.subTotal!,
          total: saleData?.total!,
          amountReceived: saleData?.amountReceived!,
          customerChange: saleData?.customerChange!,
          discount: saleData?.discount!,
          items: saleItemData?.map(
            ({ productId, product, quantity, unitPrice, sellingPrice }) => ({
              productId,
              name: product.name,
              quantity,
              unitPrice,
              sellingPrice,
              totalCost: quantity * sellingPrice,
            })
          )!,
        });
        setCompleted(true);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error('Error creating sale:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setSelectedPaymentOption('cash');
    setCashReceived(0);
    setIsRoomCharge(false);
    setRoomNumber('');
    setShowRoomChargeOptions(false);
    setIsLoading(false);
    setCompleted(false);
    router.refresh();
    resetDiscount();
    closeModal();
  };

  const handleAfterPrint = () => {
    setSelectedPaymentOption('cash');
    setCashReceived(0);
    setIsRoomCharge(false);
    setRoomNumber('');
    setShowRoomChargeOptions(false);
    setIsLoading(false);
    setCompleted(false);
    router.refresh();
    resetDiscount();
    closeModal();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={items.length === 0}
          className='w-full rounded-full py-6 font-normal text-base text-white mt-4 bg-gray-950 hover:from-blue-600 hover:to-blue-700 transition-all duration-300'
        >
          Passer à la caisse
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[500px] rounded-2xl border-[0.1px]'>
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
                onValueChange={(value: PaymentMethod) =>
                  setSelectedPaymentOption(value)
                }
              >
                <SelectTrigger className='col-span-3 shadow-none border-[0.1px]'>
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
              <Label htmlFor='room-charge'>Chambre</Label>
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
                  className='col-span-3 border-[0.1px] shadow-none'
                />
              </motion.div>
            )}
            <Separator className='bg-muted' />
            <div className='space-y-3'>
              <div className='flex justify-between text-gray-700'>
                <span>Sous-total</span>
                <span>${subTotal.toFixed(2)}</span>
              </div>
              <div className='flex justify-between text-lg text-green-600'>
                <span>Rabais</span>
                <span>-${discountValue}</span>
              </div>
              <div className='flex text-base justify-between text-gray-700'>
                <span>TCA</span>
                <span>$0</span>
              </div>
              <Separator />
              <div className='flex justify-between text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-500'>
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
            {selectedPaymentOption === 'cash' && cashReceived > 0 && (
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
                amountReceived={receiptData?.amountReceived!}
                customerChange={receiptData?.customerChange!}
                paymentMethod={selectedPaymentOption}
                salesItems={receiptData?.items!}
                onAfterPrint={handleAfterPrint}
              />
            ) : (
              <Button
                className='w-full rounded-full py-6 text-base text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl font-normal'
                disabled={
                  !selectedPaymentOption ||
                  (selectedPaymentOption === 'cash' && cashReceived < total) ||
                  (isRoomCharge && !roomNumber) ||
                  isLoading
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
  salesItems: SalesItem[];
  onAfterPrint: () => void;
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
  salesItems,
  onAfterPrint,
}: Props) => {
  return (
    <div className='flex justify-between items-center gap-4 w-full'>
      <Button
        variant='outline'
        size='lg'
        className='w-full rounded-full py-6 text-base font-normal transition-all duration-300 shadow-none border-[0.1px]'
        onClick={onCancel}
      >
        <CircleX className='mr-2 w-5 h-5' strokeWidth={1} />
        Annuler
      </Button>
      <BarReceipt
        transactionId={transactionId}
        cashier={cashier}
        items={salesItems}
        subtotal={subTotal}
        discount={discount}
        total={total}
        amountReceived={amountReceived}
        change={customerChange}
        paymentMethod={paymentMethod}
        onAfterPrint={onAfterPrint}
      />
    </div>
  );
};
