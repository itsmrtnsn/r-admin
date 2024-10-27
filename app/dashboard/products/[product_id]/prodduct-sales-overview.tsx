import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';

const ProductSalesOverview = () => {
  return (
    <Card className='shadow-none border-[0.1px]'>
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
          </TabsList>
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
              <div className='bg-slate-50/50 border-[0.1px] p-4 rounded-lg'>
                <h3 className='font-semibold'>Profit Margin</h3>
                <p className='text-2xl font-bold'>32%</p>
              </div>
              <div className='p-4 rounded-lg bg-slate-50/50 border-[0.1px]'>
                <h3 className='font-semibold'>Avg. Transaction Value</h3>
                <p className='text-2xl font-bold'>$30</p>
              </div>
              <div className='p-4 rounded-lg bg-slate-50/50 border-[0.1px]'>
                <h3 className='font-semibold'>Stock Turnover Rate</h3>
                <p className='text-2xl font-bold'>4.2x/month</p>
              </div>
              <div className='bg-slate-50/50 border-[0.1px] p-4 rounded-lg'>
                <h3 className='font-semibold'>Contribution to Total Sales</h3>
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
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProductSalesOverview;
