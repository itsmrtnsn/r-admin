import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

const DashboardPage = () => {
  return (
    <div className='h-[80vh] flex items-center justify-center'>
      <Card className='bg-background'>
        <CardContent className='w-[40rem] h-[30rem]'></CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
