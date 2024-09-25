import { DateRangeFilter } from '@/components/formatted-date-range-filter';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { IoMdAdd } from 'react-icons/io';
import { CategoryFilter } from './components/category-filter';
import EmptyProductTable from './components/empty-product-table';
import ProductTable from './components/product-table';
import { getProducts } from './data/get-products';

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
  const { products, pagination } = await getProducts(
    searchParams.product_status,
    currentPage,
    itemsPerPage
  );

  products.length === 0 && <EmptyProductTable />;

  return (
    <>
      <div className='flex items-center justify-between mb-5 mt-1'>
        <div className='flex items-center gap-3'>
          <CategoryFilter />
          <DateRangeFilter />
        </div>
        <Link
          href='/dashboard/products/new'
          className={cn(buttonVariants({ variant: 'default', size: 'lg' }))}
        >
          <IoMdAdd className='mr-2' />
          Créer un Article
        </Link>
      </div>
      <ProductTable
        products={products}
        totalPages={pagination.totalPages}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />
    </>
  );
};

export default ProductsPage;
