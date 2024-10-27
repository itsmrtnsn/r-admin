import CurrentPath from '@/components/curren-path';
import { DateRangePicker } from '@/components/data-range-picker';
import Search from '@/components/search';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import DailySalesChart from './daily-sales-chart';
import reportSummary from './report-summary';
import ReportSummaryCard from './report-summary-card';
import SalesCategoryDistribution from './sale-category-distribution';
import salesRepport from './sales-repport';
import SalesTable from './sales-table';
import Pagination from '@/components/pagination';

export default async function SalesReport() {
  const { totalRevenue, averageOrdervalue, newCutomers, totalSales } =
    await reportSummary();

  const sales = await salesRepport();

  console.log(sales);
  return (
    <div className='p-8'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4'>
        <CurrentPath />
        <DateRangePicker />
      </div>

      <ScrollArea className='h-[80vh] pb-2'>
        <div className=' space-y-8'>
          <ReportSummaryCard
            totalSalesValue={totalRevenue}
            averageSalesValue={averageOrdervalue}
            salesCount={totalSales}
            newCustomers={newCutomers}
          />

          <div className='grid grid-cols-2 gap-4'>
            <DailySalesChart />
            <SalesCategoryDistribution
              food={10}
              drink={20}
              room={100}
              other={50}
            />
            <Card className='col-span-2 border-[0.1px] 0 shadow-none'>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <Search />
                  <Button>Filter By Category</Button>
                </div>
              </CardHeader>
              <CardContent>
                <SalesTable sales={sales} />
                <Pagination totalPages={1} currentPage={1} itemsPerPage={10} />
              </CardContent>
            </Card>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
