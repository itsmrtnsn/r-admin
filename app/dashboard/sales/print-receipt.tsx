import { Button } from '@/components/ui/button';

const PrintReceipt = () => {
  return (
    <div className='flex justify-between items-center gap-4 w-full'>
      <Button
        variant={'outline'}
        size='lg'
        className='w-full rounded-full py-6 text-lg  text-white bg-gradient-to-r  transition-all duration-300 shadow-lg hover:shadow-xl font-normal'
      >
        Cancel
      </Button>
      <Button className='w-full rounded-full py-6 text-lg  text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl font-normal'>
        Print Receipt
      </Button>
    </div>
  );
};

export default PrintReceipt;
