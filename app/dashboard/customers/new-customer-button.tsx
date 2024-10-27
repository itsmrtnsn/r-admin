import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const NewCustomerButton = () => {
  return (
    <Link href='#'>
      <Button
        variant={'outline'}
        className='bg-gray-950 text-white font-normal'
      >
        New Customer
      </Button>
    </Link>
  );
};

export default NewCustomerButton;
