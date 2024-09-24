import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';

const ProductCategoryForm = () => {
  return (
    <Card
      x-chunk='dashboard-07-chunk-2'
      className='bg-muted max-w-[16rem] shadow-none  bg-white border-[0.1px] rounded-xl'
    >
      <CardHeader>
        <CardTitle>Catégorie de l'article</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='w-full'>
          <div className='grid gap-3'>
            <Label htmlFor='category'>Catégorie</Label>
            <Select defaultValue='clothing'>
              <SelectTrigger
                id='category'
                aria-label='Select category'
                className='w-full border-slate-400 border-[0.1px] placeholder:text-gray-600 placeholder:text-sm focus-visible:ring-1 outline-none focus-visible:border-none transition-all ease-in-out duration-300 hover:border-gray-300 focus:scale-[1.02]'
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='clothing'>Clothing</SelectItem>
                <SelectItem value='electronics'>Electronics</SelectItem>
                <SelectItem value='accessories'>Accessories</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='mt-6 grid gap-3'>
            <Label htmlFor='status' className='text-'>
              Statut
            </Label>
            <Select defaultValue='draft'>
              <SelectTrigger id='status' aria-label='Select status'>
                <SelectValue defaultValue='draft' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='draft'>Draft</SelectItem>
                <SelectItem value='published'>Published</SelectItem>
                <SelectItem value='archived'>Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCategoryForm;
