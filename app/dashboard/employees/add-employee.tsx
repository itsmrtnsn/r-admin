import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { IoMdAdd } from 'react-icons/io';

const AddEmployee = () => {
  return (
    <Link href='/dashboard/employees/new'>
      <Button
        size='lg'
        // variant='outline'
        className='pl-2 pr-4 h-10 shadow-none border-[0.1px] bg-blue-700 text-white  hover:bg-blue-800'
      >
        <IoMdAdd className='w-5 h-5 mr-2' />
        Add Employee
      </Button>
    </Link>
  );
};

export default AddEmployee;
