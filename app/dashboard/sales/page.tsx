'use client';

import { Card, CardContent } from '@/components/ui/card';
import Cart from './cart';
import ProductCard from './product-card';
import ItemsGrid from './items-grid';
import ProductSearch from '../products/components/product-search';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import UserAvatar from '@/components/user-avatar';

const products: {
  id: string;
  name: string;
  price: number;
  category: string;
}[] = [
  { id: '1', name: 'Craft Lager', price: 5.0, category: 'Beer' },
  { id: '2', name: 'Signature Margarita', price: 8.0, category: 'Cocktails' },
  { id: '3', name: 'Botanical Gin Fizz', price: 7.5, category: 'Cocktails' },
  { id: '4', name: 'Single Malt Whiskey', price: 9.0, category: 'Spirits' },
  { id: '5', name: 'Pinot Noir', price: 7.0, category: 'Wine' },
  { id: '6', name: 'Chardonnay', price: 7.0, category: 'Wine' },
  { id: '7', name: 'Moscow Mule', price: 6.5, category: 'Cocktails' },
  { id: '8', name: 'Cuba Libre', price: 6.5, category: 'Cocktails' },
  { id: '9', name: 'IPA', price: 4.5, category: 'Beer' },
  { id: '10', name: 'Tequila Shot', price: 5.0, category: 'Spirits' },
  { id: '11', name: 'Classic Mojito', price: 8.5, category: 'Cocktails' },
  { id: '12', name: 'Espresso Martini', price: 10.0, category: 'Cocktails' },
];

const SalesPage = () => {
  return (
    <div className='grid grid-cols-[1fr_auto] gap-4 overflow-hidden  rounded-lg p-4'>
      <Card className='border-none shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
        <CardContent className=''>
          <div className='mt-4 mb-8 flex items-center justify-between'>
            <ProductSearch />
            <UserAvatar />
          </div>
          <ScrollArea className='h-[calc(86vh-4rem)]'>
            <ItemsGrid />
            <ScrollBar />
          </ScrollArea>
        </CardContent>
      </Card>
      <div className='w-[22rem]'>
        <Cart />
      </div>
    </div>
  );
};

export default SalesPage;
