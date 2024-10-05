import React from 'react';
import EmployeeRegistrationForm from './registration-form';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

const NewEmployee = () => {
  return (
    <div className='mt- p-8'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold'>New Employee</h1>
        <p className='text-sm text-gray-500'>
          Please fill in the form below to register a new employee.
        </p>
      </div>
      <ScrollArea className='h-[80vh]'>
        <EmployeeRegistrationForm />
      </ScrollArea>
    </div>
  );
};

export default NewEmployee;
