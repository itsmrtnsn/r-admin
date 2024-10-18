import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import UserAvatar from '@/components/user-avatar';
import ProductSearch from '../products/components/product-search';
import Cart from './cart';
import ProductGrid from './product-grid';
import { getProducts } from '../_actions/get-products';

interface Props {
  searchParams: { product_search: string };
}

const SalesPage = async ({ searchParams: { product_search } }: Props) => {
  const products = await getProducts();
  return (
    <div className='grid grid-cols-[1fr_auto] gap-4 overflow-hidden  rounded-lg p-4'>
      <Card className=' border-[0.1px]  bg-zinc-900'>
        <CardContent>
          <div className='mt-4 mb-8 flex items-center justify-between'>
            <ProductSearch />
            <UserAvatar fallback={'GC'} />
          </div>
          <ScrollArea className='h-[calc(89vh-6rem)]'>
            <ProductGrid products={products} />
            <ScrollBar />
          </ScrollArea>
        </CardContent>
      </Card>
      <div className='w-[22rem] border-[0.1px] rounded-lg '>
        <Cart />
      </div>
    </div>
  );
};

export default SalesPage;
