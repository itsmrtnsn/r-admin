import CurrentPath from '@/components/curren-path';
import { DatePicker } from '@/components/date-picker';
import Search from '@/components/search';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import AddNewProducts from './components/add-new-products';
import ProductTable from './components/product-table';
import { getProducts } from '../_actions/get-products';

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

const ProductsPage = async ({ searchParams }: Props) => {
  const itemsPerPage = 10;
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  // const { products, pagination } = await getProducts(
  //   searchParams.product_status,
  //   currentPage,
  //   itemsPerPage
  // );

  // products.length === 0 && <EmptyProductTable />;

  const products = await getProducts();

  return (
    <div className='p-4 space-y-6 '>
      <div className='flex justify-between items-center'>
        <CurrentPath />
        <DatePicker />
      </div>
      <ScrollArea className='h-[80vh]'>
        <div className='space-y-10'>
          <Card className='border-[0.1px]  bg-zinc-900 shadow-none flex-1 overflow-hidden'>
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
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProductsPage;
