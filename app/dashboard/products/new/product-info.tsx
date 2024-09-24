import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
import React from 'react';

const ProductInfoForm = () => {
  return (
    <Card
      x-chunk='dashboard-07-chunk-0'
      className='shadow-none bg-white border-[0.1px] rounded-xl pb-4'
    >
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
        {/* <CardDescription>
          • Enter a concise, memorable product name. • Provide a clear
          description highlighting key features and benefits.
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className='grid gap-8'>
          <div className='flex gap-3 items-center'>
            <div className='w-full'>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                type='text'
                className='w-full border-slate-400 border-[0.1px] placeholder:text-gray-600 placeholder:text-sm focus-visible:ring-1 outline-none focus-visible:border-none transition-all ease-in-out duration-300 hover:border-gray-300 focus:scale-[1.02]'
              />
            </div>
            <div className='w-full'>
              <Label htmlFor='description'>Price</Label>
              <Input
                id='description'
                defaultValue=''
                className=' w-full border-slate-400 border-[0.1px] placeholder:text-gray-600 placeholder:text-sm focus-visible:ring-1 outline-none focus-visible:border-none transition-all ease-in-out duration-300 hover:border-gray-300 focus:scale-[1.02]'
              />
            </div>
          </div>

          <div className='flex gap-3 items-center'>
            <div className='w-full'>
              <Label htmlFor='description'>Quantity</Label>
              <Input
                id='description'
                defaultValue=''
                className=' w-full border-slate-400 border-[0.1px] placeholder:text-gray-600 placeholder:text-sm focus-visible:ring-1 outline-none focus-visible:border-none transition-all ease-in-out duration-300 hover:border-gray-300 focus:scale-[1.02]'
              />
            </div>
            <div className='w-full'>
              <Label htmlFor='description'>Theshold</Label>
              <Input
                id='description'
                defaultValue=''
                className=' w-full border-slate-400 border-[0.1px] placeholder:text-gray-600 placeholder:text-sm focus-visible:ring-1 outline-none focus-visible:border-none transition-all ease-in-out duration-300 hover:border-gray-300 focus:scale-[1.02]'
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductInfoForm;
