// import BarCode from '@/app/studio/barcode';
// import ContactInfo from '@/app/studio/contact-info';
// import ItemList from '@/app/studio/item-list';
// import PaymentInfo from '@/app/studio/payment-info';
// import PaymentMethod from '@/app/studio/payment-method';
// import { receiptData } from '@/app/studio/receipt-data';
// import ReceiptHeader from '@/app/studio/receipt-header';
// import StylistInfo from '@/app/studio/stylist-info';
// import ThankYouMessage from '@/app/studio/thankyou-message';
// import TotalSection from '@/app/studio/total-section';
// import TransactionInfo from '@/app/studio/transaction-info';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download } from 'lucide-react';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Header from './header';
import ContactInfo from './contact-info';
import TransactionInfo from './transaction-info';
import ItemList from './item-list';
import TotalSection from './total-section';
import PaymentInfo from './payment-info';
import PaymentMethod from './payment-method';
import ThankYouMessage from './thankyou-message';
import BarCode from './bar-code';

type ReceiptSize = '80mm' | '58mm';

const ReceiptContent = React.forwardRef<
  HTMLDivElement,
  { receiptSize: ReceiptSize }
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
      <TransactionInfo />
      {/* <StylistInfo /> */}
      <div className='border-t border-gray-300 my-4 print:border-gray-400'></div>
      <ItemList />
      <div className='border-t border-gray-300 my-4 print:border-gray-400'></div>
      <TotalSection />
      <PaymentInfo />
      <PaymentMethod />
      <div className='border-t border-gray-300 my-4 print:border-gray-400'></div>
      <ThankYouMessage />
      <BarCode />
    </Card>
  </div>
));
ReceiptContent.displayName = 'ReceiptContent';

const MagicStudioReceipt = () => {
  const receiptRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
    // documentTitle: `StudioMagique_Reçu_${receiptData.transactionId}`,
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
      <ReceiptContent ref={receiptRef} receiptSize={'80mm'} />
    </div>
  );
};

export default MagicStudioReceipt;
