import { Banknote } from 'lucide-react';

interface Props {
  amountReceived: number;
  change: number;
}

const PaymentInfo = ({ amountReceived, change }: Props) => {
  return (
    <div className='mt-4 space-y-1 text-xs text-gray-600'>
      <div className='flex justify-between'>
        <span className='flex items-center'>
          <Banknote className='w-3 h-3 mr-1 text-gray-400' />
          Reçu:
        </span>
        <span>{amountReceived} G</span>
      </div>
      <div className='flex justify-between'>
        <span>Monnaie:</span>
        <span>{change} G</span>
      </div>
    </div>
  );
};

export default PaymentInfo;
