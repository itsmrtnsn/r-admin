import { DateRangePicker } from '@/components/data-range-picker';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getProductById } from '../../_actions/get-product-by-id';
import BackButton from '../../employees/new/back-button';
import DeleteProductConfirmation from '../_components/delete-product-confirmation';
import ProductSalesOverview from './prodduct-sales-overview';
import { ProductAnaliticsChart } from './product-analitics-chart';
import ProductDetailSummaryCard from './product-detail-summary-cards';

const salesData = [
  { date: '2023-01', sales: 120, revenue: 3600 },
  { date: '2023-02', sales: 150, revenue: 4500 },
  { date: '2023-03', sales: 200, revenue: 6000 },
  { date: '2023-04', sales: 180, revenue: 5400 },
  { date: '2023-05', sales: 220, revenue: 6600 },
  { date: '2023-06', sales: 250, revenue: 7500 },
];

const hourlyData = [
  { hour: '9AM', sales: 10 },
  { hour: '10AM', sales: 15 },
  { hour: '11AM', sales: 20 },
  { hour: '12PM', sales: 30 },
  { hour: '1PM', sales: 25 },
  { hour: '2PM', sales: 20 },
  { hour: '3PM', sales: 18 },
  { hour: '4PM', sales: 22 },
  { hour: '5PM', sales: 28 },
];

interface Props {
  params: { product_id: string };
}

export default async function POSSingleProductAnalytics({
  params: { product_id },
}: Props) {
  const response = await getProductById(product_id);

  if (!response.success) return <p>Product not found.</p>;

  return (
    <div className='flex flex-col p-8'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-4'>
          <BackButton />
          <h1 className='text-3xl font-bold'>{response.product?.name}</h1>
        </div>
        <DateRangePicker />
      </div>

      <ScrollArea className='h-[75vh] overflow-hidden mt-6'>
        <div className='space-y-10'>
          <ProductDetailSummaryCard />
          <ProductAnaliticsChart />
          <ProductSalesOverview />
          <div className='flex justify-end'>
            <DeleteProductConfirmation id={product_id} />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
