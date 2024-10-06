import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import UserAvatar from '@/components/user-avatar';
import ProductSearch from '../products/components/product-search';
import Cart from './cart';
import ProductGrid from './product-grid';
import { ProductCard } from './types/product';

interface Props {
  searchParams: { product_search: string };
}

const SalesPage = ({ searchParams: { product_search } }: Props) => {
  const products: ProductCard[] = [
    {
      id: '1',
      name: 'Prestige',
      price: 250,
      category: 'Beer',
      quantityInStock: 3,
    },
    {
      id: '2',
      name: '7up',
      price: 150,
      category: 'Cocktails',
      quantityInStock: 3,
    },
    {
      id: '3',
      name: 'Jumex',
      price: 7.5,
      category: 'Cocktails',
      quantityInStock: 0,
    },
    {
      id: '4',
      name: 'Single Malt Whiskey',
      price: 9.0,
      category: 'Spirits',
      quantityInStock: 0,
    },
    {
      id: '5',
      name: 'Pinot Noir',
      price: 7.0,
      category: 'Wine',
      quantityInStock: 0,
    },
    {
      id: '6',
      name: 'Chardonnay',
      price: 7.0,
      category: 'Wine',
      quantityInStock: 1,
    },
    {
      id: '7',
      name: 'Moscow Mule',
      price: 6.5,
      category: 'Cocktails',
      quantityInStock: 80,
    },
    {
      id: '7',
      name: 'Moscow Mule',
      price: 6.5,
      category: 'Cocktails',
      quantityInStock: 80,
    },
    {
      id: '7',
      name: 'Moscow Mule',
      price: 6.5,
      category: 'Cocktails',
      quantityInStock: 80,
    },
    {
      id: '7',
      name: 'Moscow Mule',
      price: 6.5,
      category: 'Cocktails',
      quantityInStock: 80,
    },
    {
      id: '7',
      name: 'Moscow Mule',
      price: 6.5,
      category: 'Cocktails',
      quantityInStock: 80,
    },
    {
      id: '7',
      name: 'Moscow Mule',
      price: 6.5,
      category: 'Cocktails',
      quantityInStock: 80,
    },
    {
      id: '7',
      name: 'Moscow Mule',
      price: 6.5,
      category: 'Cocktails',
      quantityInStock: 80,
    },
    {
      id: '7',
      name: 'Moscow Mule',
      price: 6.5,
      category: 'Cocktails',
      quantityInStock: 80,
    },
    {
      id: '7',
      name: 'Moscow Mule',
      price: 6.5,
      category: 'Cocktails',
      quantityInStock: 80,
    },
    {
      id: '7',
      name: 'Moscow Mule',
      price: 6.5,
      category: 'Cocktails',
      quantityInStock: 80,
    },
  ];
  let filteredProduct = products;
  if (product_search)
    products.filter((product) =>
      product.name
        .toLocaleLowerCase()
        .startsWith(product_search.toLocaleLowerCase())
    );
  return (
    <div className='grid grid-cols-[1fr_auto] gap-4 overflow-hidden  rounded-lg p-4'>
      <Card className='border-none shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
        <CardContent>
          <div className='mt-4 mb-8 flex items-center justify-between'>
            <ProductSearch />
            <UserAvatar fallback={'GC'} />
          </div>
          <ScrollArea className='h-[calc(89vh-6rem)]'>
            <ProductGrid products={filteredProduct} />
            <ScrollBar />
          </ScrollArea>
        </CardContent>
      </Card>
      <div className='w-[22rem] border-[0.1px] rounded-lg'>
        <Cart />
      </div>
    </div>
  );
};

export default SalesPage;
