import CurrentPath from '@/components/curren-path';
import { DatePicker } from '@/components/date-picker';
import Pagination from '@/components/pagination';
import Search from '@/components/search';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import getPproductSummary from '../_actions/get-product-summary';
import { getProducts } from '../_actions/get-products';
import AddNewProducts from './components/add-new-products';
import ProductSummaryCards from './components/product-summary-cards';
import ProductTable from './components/product-table';
import { Suspense } from 'react';

interface Props {
  searchParams: { searchQuery: string; page: string };
}

const ProductsPage = async ({ searchParams: { searchQuery, page } }: Props) => {
  const currentPage = page ? parseInt(page) : 1;
  const itemsPerPage = 10;

  const { products, totalPages } = await getProducts(
    searchQuery,
    currentPage,
    itemsPerPage
  );

  const {
    totalActiveProducts,
    totalArchivedProducts,
    totalDraftProducts,
    totalProducts,
  } = await getPproductSummary();

  return (
    <div className='p-4 space-y-10 '>
      <div className='flex justify-between items-center'>
        <CurrentPath />
        <DatePicker />
      </div>
      <ScrollArea className='h-[80vh] overflow-hidden'>
        <div className=' space-y-8'>
          <Suspense fallback='loading...'>
            <ProductSummaryCards
              total={totalProducts}
              archieved={totalArchivedProducts}
              active={totalActiveProducts}
              draft={totalDraftProducts}
            />
          </Suspense>
          <Card className='shadow-none flex-1 overflow-hidden border-[0.1px]'>
            <CardHeader>
              <div className='flex items-center gap-2 justify-between'>
                <Search />
                <AddNewProducts />
              </div>
            </CardHeader>

            {products.length >= 1 ? (
              <CardContent>
                <ProductTable products={products} />
                {/* <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                /> */}
              </CardContent>
            ) : (
              <EmptyProducts />
            )}
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProductsPage;

const EmptyProducts = () => {
  return (
    <div className='border-[0.1px] bg-white flex items-center justify-center flex-col rounded-xl overflow-hidden p-2  h-[20rem] mx-6 mb-6 space-y-4 '>
      <h1 className='text-3xl '>Aucun produit trouvé</h1>
      <AddNewProducts />
    </div>
  );
};
