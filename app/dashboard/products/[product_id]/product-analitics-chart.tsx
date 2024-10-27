'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export const description = 'An interactive bar chart for sales and revenue';

const chartData = [
  { date: '2024-04-01', sales: 222, revenue: 1500 },
  { date: '2024-04-02', sales: 97, revenue: 1800 },
  { date: '2024-04-03', sales: 167, revenue: 1200 },
  { date: '2024-04-04', sales: 242, revenue: 2600 },
  { date: '2024-04-05', sales: 373, revenue: 2900 },
  { date: '2024-04-06', sales: 301, revenue: 3400 },
  { date: '2024-04-07', sales: 245, revenue: 1800 },
  { date: '2024-04-08', sales: 409, revenue: 3200 },
  { date: '2024-04-09', sales: 59, revenue: 1100 },
  { date: '2024-04-10', sales: 261, revenue: 1900 },
  { date: '2024-04-11', sales: 327, revenue: 3500 },
  { date: '2024-04-12', sales: 292, revenue: 2100 },
  { date: '2024-04-13', sales: 342, revenue: 3800 },
  { date: '2024-04-14', sales: 137, revenue: 2200 },
  { date: '2024-04-15', sales: 120, revenue: 1700 },
  { date: '2024-04-16', sales: 138, revenue: 1900 },
  { date: '2024-04-17', sales: 446, revenue: 3600 },
  { date: '2024-04-18', sales: 364, revenue: 4100 },
  { date: '2024-04-19', sales: 243, revenue: 1800 },
  { date: '2024-04-20', sales: 89, revenue: 1500 },
  { date: '2024-04-21', sales: 137, revenue: 2000 },
  { date: '2024-04-22', sales: 224, revenue: 1700 },
  { date: '2024-04-23', sales: 138, revenue: 2300 },
  { date: '2024-04-24', sales: 387, revenue: 2900 },
  { date: '2024-04-25', sales: 215, revenue: 2500 },
  { date: '2024-04-26', sales: 75, revenue: 1300 },
  { date: '2024-04-27', sales: 383, revenue: 4200 },
  { date: '2024-04-28', sales: 122, revenue: 1800 },
  { date: '2024-04-29', sales: 315, revenue: 2400 },
  { date: '2024-04-30', sales: 454, revenue: 3800 },
  { date: '2024-05-01', sales: 165, revenue: 2200 },
  { date: '2024-05-02', sales: 293, revenue: 3100 },
  { date: '2024-05-03', sales: 247, revenue: 1900 },
  { date: '2024-05-04', sales: 385, revenue: 4200 },
  { date: '2024-05-05', sales: 481, revenue: 3900 },
  { date: '2024-05-06', sales: 498, revenue: 5200 },
  { date: '2024-05-07', sales: 388, revenue: 3000 },
  { date: '2024-05-08', sales: 149, revenue: 2100 },
  { date: '2024-05-09', sales: 227, revenue: 1800 },
  { date: '2024-05-10', sales: 293, revenue: 3300 },
  { date: '2024-05-11', sales: 335, revenue: 2700 },
  { date: '2024-05-12', sales: 197, revenue: 2400 },
  { date: '2024-05-13', sales: 197, revenue: 1600 },
  { date: '2024-05-14', sales: 448, revenue: 4900 },
  { date: '2024-05-15', sales: 473, revenue: 3800 },
  { date: '2024-05-16', sales: 338, revenue: 4000 },
  { date: '2024-05-17', sales: 499, revenue: 4200 },
  { date: '2024-05-18', sales: 315, revenue: 3500 },
  { date: '2024-05-19', sales: 235, revenue: 1800 },
  { date: '2024-05-20', sales: 177, revenue: 2300 },
  { date: '2024-05-21', sales: 82, revenue: 1400 },
  { date: '2024-05-22', sales: 81, revenue: 1200 },
  { date: '2024-05-23', sales: 252, revenue: 2900 },
  { date: '2024-05-24', sales: 294, revenue: 2200 },
  { date: '2024-05-25', sales: 201, revenue: 2500 },
  { date: '2024-05-26', sales: 213, revenue: 1700 },
  { date: '2024-05-27', sales: 420, revenue: 4600 },
  { date: '2024-05-28', sales: 233, revenue: 1900 },
  { date: '2024-05-29', sales: 78, revenue: 1300 },
  { date: '2024-05-30', sales: 340, revenue: 2800 },
  { date: '2024-05-31', sales: 178, revenue: 2300 },
  { date: '2024-06-01', sales: 178, revenue: 2000 },
  { date: '2024-06-02', sales: 470, revenue: 4100 },
  { date: '2024-06-03', sales: 103, revenue: 1600 },
  { date: '2024-06-04', sales: 439, revenue: 3800 },
  { date: '2024-06-05', sales: 88, revenue: 1400 },
  { date: '2024-06-06', sales: 294, revenue: 2500 },
  { date: '2024-06-07', sales: 323, revenue: 3700 },
  { date: '2024-06-08', sales: 385, revenue: 3200 },
  { date: '2024-06-09', sales: 438, revenue: 4800 },
  { date: '2024-06-10', sales: 155, revenue: 2000 },
  { date: '2024-06-11', sales: 92, revenue: 1500 },
  { date: '2024-06-12', sales: 492, revenue: 4200 },
  { date: '2024-06-13', sales: 81, revenue: 1300 },
  { date: '2024-06-14', sales: 426, revenue: 3800 },
  { date: '2024-06-15', sales: 307, revenue: 3500 },
  { date: '2024-06-16', sales: 371, revenue: 3100 },
  { date: '2024-06-17', sales: 475, revenue: 5200 },
  { date: '2024-06-18', sales: 107, revenue: 1700 },
  { date: '2024-06-19', sales: 341, revenue: 2900 },
  { date: '2024-06-20', sales: 408, revenue: 4500 },
  { date: '2024-06-21', sales: 169, revenue: 2100 },
  { date: '2024-06-22', sales: 317, revenue: 2700 },
  { date: '2024-06-23', sales: 480, revenue: 5300 },
  { date: '2024-06-24', sales: 132, revenue: 1800 },
  { date: '2024-06-25', sales: 141, revenue: 1900 },
  { date: '2024-06-26', sales: 434, revenue: 3800 },
  { date: '2024-06-27', sales: 448, revenue: 4900 },
  { date: '2024-06-28', sales: 149, revenue: 2000 },
  { date: '2024-06-29', sales: 103, revenue: 1600 },
  { date: '2024-06-30', sales: 446, revenue: 4000 },
];

const chartConfig = {
  sales: {
    label: 'Sales',
    color: 'hsl(var(--chart-1))',
  },
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function ProductAnaliticsChart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>('sales');

  const total = React.useMemo(
    () => ({
      sales: chartData.reduce((acc, curr) => acc + curr.sales, 0),
      revenue: chartData.reduce((acc, curr) => acc + curr.revenue, 0),
    }),
    []
  );

  return (
    <Card className='bg-slate-50/50 border-[0.1px] shadow-none'>
      <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6'>
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total sales and revenue for the last 3 months
          </CardDescription>
        </div>
        <div className='flex'>
          {['sales', 'revenue'].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className='relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6 '
                onClick={() => setActiveChart(chart)}
              >
                <span className='text-xs text-muted-foreground'>
                  {chartConfig[chart].label}
                </span>
                <span className='text-lg font-bold leading-none sm:text-3xl'>
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className='px-2 sm:p-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[250px] w-full'
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className='w-[150px]'
                  nameKey='sales'
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
