import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, Package, ShoppingCart, TrendingUp } from 'lucide-react';
import BackButton from '../../employees/new/back-button';
import { ProductAnaliticsChart } from './product-analitics-chart';
import { getProductById } from '../../_actions/get-product-by-id';
import DeleteProductConfirmation from '../_components/delete-product-confirmation';

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
        <DeleteProductConfirmation id={product_id} />
      </div>

      <ScrollArea className='h-[75vh] overflow-hidden mt-6'>
        <div className='space-y-10'>
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
            <Card className='bg-slate-50 shadow-none border-[0.1px]'>
              <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
                <CardTitle className='text-sm font-medium'>
                  Total Revenue
                </CardTitle>
                <DollarSign className='w-4 h-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>$33,600</div>
                <p className='text-xs text-muted-foreground'>
                  +12.5% from last month
                </p>
              </CardContent>
            </Card>
            <Card className='bg-slate-50 shadow-none border-[0.1px]'>
              <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
                <CardTitle className='text-sm font-medium'>
                  Total Sales
                </CardTitle>
                <ShoppingCart className='w-4 h-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>1,120</div>
                <p className='text-xs text-muted-foreground'>
                  +8.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card className='bg-slate-50 shadow-none border-[0.1px]'>
              <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
                <CardTitle className='text-sm font-medium'>
                  Average Transaction Value
                </CardTitle>
                <TrendingUp className='w-4 h-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>$30</div>
                <p className='text-xs text-muted-foreground'>
                  +4.2% from last month
                </p>
              </CardContent>
            </Card>
            <Card className='bg-slate-50 shadow-none border-[0.1px]'>
              <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
                <CardTitle className='text-sm font-medium'>
                  Current Stock
                </CardTitle>
                <Package className='w-4 h-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>523 units</div>
                <p className='text-xs text-muted-foreground'>
                  5 days of inventory left
                </p>
              </CardContent>
            </Card>
          </div>

          <ProductAnaliticsChart />

          <Card className='bg-slate-50 shadow-none border-[0.1px]'>
            <CardHeader>
              <CardTitle>Product Performance Metrics</CardTitle>
              <CardDescription>
                Key performance indicators for the product
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue='overview' className='space-y-4'>
                <TabsList>
                  <TabsTrigger value='overview'>Overview</TabsTrigger>
                  <TabsTrigger value='profitability'>Profitability</TabsTrigger>
                  <TabsTrigger value='trends'>Trends</TabsTrigger>
                </TabsList>
                <TabsContent value='overview' className='space-y-4'>
                  <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                    <div className='bg-white border-[0.1px] p-4 rounded-lg'>
                      <h3 className='font-semibold'>Profit Margin</h3>
                      <p className='text-2xl font-bold'>32%</p>
                    </div>
                    <div className='p-4 rounded-lg bg-white border-[0.1px]'>
                      <h3 className='font-semibold'>Avg. Transaction Value</h3>
                      <p className='text-2xl font-bold'>$30</p>
                    </div>
                    <div className='p-4 rounded-lg bg-white border-[0.1px]'>
                      <h3 className='font-semibold'>Stock Turnover Rate</h3>
                      <p className='text-2xl font-bold'>4.2x/month</p>
                    </div>
                    <div className='bg-white border-[0.1px] p-4 rounded-lg'>
                      <h3 className='font-semibold'>
                        Contribution to Total Sales
                      </h3>
                      <p className='text-2xl font-bold'>15%</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value='profitability' className='space-y-4'>
                  <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                    <div className='bg-muted p-4 rounded-lg'>
                      <h3 className='font-semibold'>Cost Price</h3>
                      <p className='text-2xl font-bold'>$20</p>
                    </div>
                    <div className='bg-muted p-4 rounded-lg'>
                      <h3 className='font-semibold'>Selling Price</h3>
                      <p className='text-2xl font-bold'>$30</p>
                    </div>
                    <div className='bg-muted p-4 rounded-lg'>
                      <h3 className='font-semibold'>Gross Profit</h3>
                      <p className='text-2xl font-bold'>$10/unit</p>
                    </div>
                    <div className='bg-muted p-4 rounded-lg'>
                      <h3 className='font-semibold'>Monthly Profit</h3>
                      <p className='text-2xl font-bold'>$10,750</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value='trends' className='space-y-4'>
                  <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                    <div className='bg-muted p-4 rounded-lg'>
                      <h3 className='font-semibold'>Sales Trend</h3>
                      <p className='text-2xl font-bold'>↗ Increasing</p>
                    </div>
                    <div className='bg-muted p-4 rounded-lg'>
                      <h3 className='font-semibold'>Peak Sales Time</h3>
                      <p className='text-2xl font-bold'>12PM - 2PM</p>
                    </div>
                    <div className='bg-muted p-4 rounded-lg'>
                      <h3 className='font-semibold'>Slowest Sales Time</h3>
                      <p className='text-2xl font-bold'>9AM - 10AM</p>
                    </div>
                    <div className='bg-muted p-4 rounded-lg'>
                      <h3 className='font-semibold'>Seasonal Demand</h3>
                      <p className='text-2xl font-bold'>Higher in Winter</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}
