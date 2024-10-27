'use client';

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

interface Props {
  food: number;
  drink: number;
  room: number;
  other: number;
}

export default function SalesCategoryDistribution({
  food,
  drink,
  room,
  other,
}: Props) {
  const chartData = [
    { category: 'Room', sales: room, fill: 'var(--color-coffee)' },
    { category: 'Drink', sales: drink, fill: 'var(--color-tea)' },
    { category: 'Food', sales: food, fill: 'var(--color-soda)' },
    { category: 'Other', sales: other, fill: 'var(--color-juice)' },
  ];
  const totalSales = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.sales, 0);
  }, []);

  return (
    <Card className='flex flex-col w-full  border-[0.1px] shadow-none col-span-2'>
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
                          className='fill-foreground text-xl font-bold'
                        >
                          {totalSales.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='fill-muted-foreground'
                        >
                          Ventes totales
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
        {/* <div className='flex items-center gap-2 font-medium leading-none'>
          Trending up by 7.5% this month <TrendingUp className='h-4 w-4' />
        </div> */}
        <div className='leading-none text-muted-foreground'>
          Affichage des ventes totales par catégorie{' '}
        </div>
      </CardFooter>
    </Card>
  );
}
