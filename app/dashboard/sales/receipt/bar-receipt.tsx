import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Printer } from 'lucide-react';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Data } from '../types/product';
import BarCode from './bar-code';
import ContactInfo from './contact-info';
import Header from './header';
import ItemList from './item-list';
import PaymentInfo from './payment-info';
import PaymentMethod from './payment-method';
import ThankYouMessage from './thankyou-message';
import TotalSection from './total-section';
import TransactionInfo from './transaction-info';

interface ReceiptProps {
  transactionId: string;
  cashier: string;
  items: Data[];
  subtotal: number;
  discount: number;
  total: number;
  amountReceived: number;
  change: number;
  paymentMethod: string;
}

type ReceiptSize = '80mm' | '58mm';

const ReceiptContent = React.forwardRef<
  HTMLDivElement,
  { receiptSize: ReceiptSize; receiptData: ReceiptProps }
>((props, ref) => (
  <div
    ref={ref}
    className={`mx-auto bg-white ${
      props.receiptSize === '80mm' ? 'w-80' : 'w-56'
    } print:mt-8 shadow-lg rounded-lg overflow-hidden`}
  >
    <Card className='p-6 space-y-4'>
      <Header />
      <ContactInfo />
      <div className='border-t border-gray-200 my-4'></div>
      <TransactionInfo
        transactionId={props.receiptData.transactionId}
        cashier={props.receiptData.cashier}
      />
      <div className='border-t border-gray-200 my-4'></div>
      <ItemList data={props.receiptData.items} />
      <div className='border-t border-gray-200 my-4'></div>
      <TotalSection
        subTotal={props.receiptData.subtotal}
        discount={props.receiptData.discount}
        tax={0}
        total={props.receiptData.total}
      />
      <PaymentInfo
        amountReceived={props.receiptData.amountReceived}
        change={props.receiptData.change}
      />
      <PaymentMethod method={props.receiptData.paymentMethod} />
      <div className='border-t border-gray-200 my-4'></div>
      <ThankYouMessage />
      <BarCode transactionId={props.receiptData.transactionId} />
    </Card>
  </div>
));

ReceiptContent.displayName = 'ReceiptContent';

export default function BarReceipt(props: ReceiptProps) {
  const receiptRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
    documentTitle: `PauseInnBar_Reçu_${props.transactionId}`,
    removeAfterPrint: true,
  });

  return (
    <div>
      <div className='sr-only'>
        <ReceiptContent
          ref={receiptRef}
          receiptSize='80mm'
          receiptData={props}
        />
      </div>

      <Button
        onClick={handlePrint}
        className='w-full rounded-full py-6 text-base  text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl font-normal'
      >
        <Printer className='mr-2 h-4 w-4' /> Imprimer le reçu
      </Button>
    </div>
  );
}
