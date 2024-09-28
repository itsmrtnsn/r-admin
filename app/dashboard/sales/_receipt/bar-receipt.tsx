import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download } from 'lucide-react';
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
    } print:mt-8`}
  >
    <Card className='shadow-none rounded-md p-4 bg-white border border-gray-200'>
      <Header />
      <ContactInfo />
      <div className='border-t border-gray-300 my-4 print:border-gray-400'></div>
      <TransactionInfo
        transactionId={props.receiptData.transactionId}
        cashier={props.receiptData.cashier}
      />
      <div className='border-t border-gray-300 my-4 print:border-gray-400'></div>
      <ItemList data={props.receiptData.items} />
      <div className='border-t border-gray-300 my-4 print:border-gray-400'></div>
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
      <div className='border-t border-gray-300 my-4 print:border-gray-400'></div>
      <ThankYouMessage />
      <BarCode transactionId={props.receiptData.transactionId} />
    </Card>
  </div>
));
ReceiptContent.displayName = 'ReceiptContent';

const BarReceipt: React.FC<ReceiptProps> = (props) => {
  const receiptRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
    documentTitle: `PauseInnBar_Reçu_${props.transactionId}`,
    removeAfterPrint: true,
  });

  return (
    <div className='space-y-4'>
      <div className='flex justify-center'>
        <Button
          onClick={handlePrint}
          className='bg-gray-800 text-white hover:bg-gray-700'
        >
          <Download className='mr-2 h-4 w-4' /> Télécharger PDF
        </Button>
      </div>
      <ReceiptContent
        ref={receiptRef}
        receiptSize={'80mm'}
        receiptData={props}
      />
    </div>
  );
};

export default BarReceipt;
