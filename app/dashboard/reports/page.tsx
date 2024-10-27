import CurrentPath from '@/components/curren-path';
import { DateRangePicker } from '@/components/data-range-picker';
import Pagination from '@/components/pagination';
import Search from '@/components/search';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import reportSummary from './report-summary';
import ReportSummaryCard from './report-summary-card';
import SalesCategoryDistribution from './sale-category-distribution';
import salesRepport from './sales-repport';
import SalesTable from './sales-table';
import TopSellingProducts from './best-selling-products';
import SalesCategoryFilter from './sales-category-filter';
import { SaleCategory } from '@prisma/client';

interface Props {
  searchParams: {
    searchQuery: string;
    page: string;
    date_range: string;
    category: SaleCategory;
  };
}

export default async function SalesReport({
  searchParams: { searchQuery, page, date_range, category },
}: Props) {
  const date = date_range && date_range.split('x');
  const startDate = date ? new Date(date[0]) : undefined;
  const endDate = date ? new Date(date[1]) : undefined;

  const currentPage = page ? parseInt(page) : 1;
  const itemsPerPage = 10;
  const { salesByCategory } = await reportSummary(startDate, endDate);

  const {
    sales,
    totalSalesCount,
    totalPage,
    totalRevenue: revenue,
  } = await salesRepport(
    searchQuery,
    currentPage,
    itemsPerPage,
    category,
    startDate,
    endDate
  );

  const foodSales =
    salesByCategory.find((category) => category.name === 'FOOD')?.value || 0;
  const drinkSales =
    salesByCategory.find((category) => category.name === 'DRINK')?.value || 0;
  const roomSales =
    salesByCategory.find((category) => category.name === 'ROOM')?.value || 0;
  const otherSales =
    salesByCategory.find((category) => category.name === 'OTHER')?.value || 0;

  return (
    <div className='p-8'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4'>
        <CurrentPath />
        <DateRangePicker />
      </div>

      <ScrollArea className='h-[80vh] pb-2'>
        <div className=' space-y-8'>
          <ReportSummaryCard endDate={endDate} startDate={startDate} />
          <div className='grid grid-cols-5 gap-4'>
            <TopSellingProducts startDate={startDate} endDate={endDate} />
            <SalesCategoryDistribution
              food={foodSales}
              drink={drinkSales}
              room={roomSales}
              other={otherSales}
            />
          </div>

          <Card className='col-span-1 border-[0.1px] 0 shadow-none'>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <Search />
                {/* <Button>Filter By Category</Button> */}
                <SalesCategoryFilter />
              </div>
            </CardHeader>
            <CardContent>
              <SalesTable sales={sales} totalRevenue={revenue} />
              <Pagination
                totalPages={totalPage}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={totalSalesCount}
              />
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}
