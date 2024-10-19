import CurrentPath from '@/components/curren-path';
import { DatePicker } from '@/components/date-picker';
import Search from '@/components/search';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getProducts } from '../_actions/get-products';
import AddNewProducts from './components/add-new-products';
import ProductTable from './components/product-table';

interface Props {
  searchParams: {
    product_status?:
      | 'all'
      | 'out_of_stock'
      | 'low_stock'
      | 'stock_ok'
      | 'draft'
      | 'archived';
    page: string;
  };
}

const ProductsPage = async () => {
  const products = await getProducts();

  return (
    <div className='p-4 space-y-6 '>
      <div className='flex justify-between items-center'>
        <CurrentPath />
        <DatePicker />
      </div>
      <ScrollArea className='h-[80vh] overflow-hidden'>
        {products.length >= 1 ? (
          <Card className='border-[0.1px] bg-zinc-900 shadow-none flex-1 overflow-hidden'>
            <CardHeader>
              <div className='flex items-center gap-2 justify-between'>
                <Search />
                <AddNewProducts />
              </div>
            </CardHeader>
            <CardContent>
              <ProductTable products={products} />
            </CardContent>
          </Card>
        ) : (
          <EmptyProducts />
        )}
      </ScrollArea>
    </div>
  );
};

export default ProductsPage;

const EmptyProducts = () => {
  return (
    <div className='border border-dashed flex items-center justify-center flex-col rounded-lg overflow-hidden p-2  h-[32rem] mt-10 space-y-4'>
      <h1 className='text-2xl font-semibold'>Aucun produit trouvé</h1>
      <AddNewProducts />
    </div>
  );
};
