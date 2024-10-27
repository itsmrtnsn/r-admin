'use client';

import { TrendingUp } from 'lucide-react';
import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { category: 'coffee', sales: 1275, fill: 'var(--color-coffee)' },
  { category: 'tea', sales: 950, fill: 'var(--color-tea)' },
  { category: 'soda', sales: 800, fill: 'var(--color-soda)' },
  { category: 'juice', sales: 675, fill: 'var(--color-juice)' },
  { category: 'water', sales: 500, fill: 'var(--color-water)' },
];

const chartConfig = {
  sales: {
    label: 'Sales',
  },
  coffee: {
    label: 'Coffee',
    color: 'hsl(var(--chart-1))',
  },
  tea: {
    label: 'Tea',
    color: 'hsl(var(--chart-2))',
  },
  soda: {
    label: 'Soda',
    color: 'hsl(var(--chart-3))',
  },
  juice: {
    label: 'Juice',
    color: 'hsl(var(--chart-4))',
  },
  water: {
    label: 'Water',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export default function SalesCategoryDistribution() {
  const totalSales = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.sales, 0);
  }, []);

  return (
    <Card className='flex flex-col w-full  border-[0.1px] shadow-none'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Répartition des ventes par catégorie</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[250px]'
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey='sales'
              nameKey='category'
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className='fill-foreground text-3xl font-bold'
                        >
                          {totalSales.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='fill-muted-foreground'
                        >
                          Total Sales
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col gap-2 text-sm'>
        <div className='flex items-center gap-2 font-medium leading-none'>
          Trending up by 7.5% this month <TrendingUp className='h-4 w-4' />
        </div>
        <div className='leading-none text-muted-foreground'>
          Showing total sales for each drink category in the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
