'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const description =
  'An interactive area chart showing attendance report';

const chartData = [
  { date: '2024-04-01', present: 85, absent: 15, onTime: 80, late: 5 },
  { date: '2024-04-02', present: 82, absent: 18, onTime: 78, late: 4 },
  { date: '2024-04-03', present: 88, absent: 12, onTime: 85, late: 3 },
  { date: '2024-04-04', present: 90, absent: 10, onTime: 87, late: 3 },
  { date: '2024-04-05', present: 86, absent: 14, onTime: 84, late: 2 },
  { date: '2024-04-06', present: 91, absent: 9, onTime: 89, late: 2 },
  { date: '2024-04-07', present: 89, absent: 11, onTime: 86, late: 3 },
  { date: '2024-04-08', present: 87, absent: 13, onTime: 84, late: 3 },
  { date: '2024-04-09', present: 92, absent: 8, onTime: 90, late: 2 },
  { date: '2024-04-10', present: 84, absent: 16, onTime: 81, late: 3 },
  { date: '2024-04-11', present: 86, absent: 14, onTime: 83, late: 3 },
  { date: '2024-04-12', present: 88, absent: 12, onTime: 86, late: 2 },
  { date: '2024-04-13', present: 90, absent: 10, onTime: 88, late: 2 },
  { date: '2024-04-14', present: 91, absent: 9, onTime: 89, late: 2 },
  { date: '2024-04-15', present: 89, absent: 11, onTime: 87, late: 2 },
  { date: '2024-04-16', present: 87, absent: 13, onTime: 85, late: 2 },
  { date: '2024-04-17', present: 85, absent: 15, onTime: 83, late: 2 },
  { date: '2024-04-18', present: 86, absent: 14, onTime: 84, late: 2 },
  { date: '2024-04-19', present: 88, absent: 12, onTime: 86, late: 2 },
  { date: '2024-04-20', present: 90, absent: 10, onTime: 88, late: 2 },
  { date: '2024-04-21', present: 92, absent: 8, onTime: 90, late: 2 },
  { date: '2024-04-22', present: 89, absent: 11, onTime: 87, late: 2 },
  { date: '2024-04-23', present: 87, absent: 13, onTime: 85, late: 2 },
  { date: '2024-04-24', present: 85, absent: 15, onTime: 83, late: 2 },
  { date: '2024-04-25', present: 86, absent: 14, onTime: 84, late: 2 },
  { date: '2024-04-26', present: 88, absent: 12, onTime: 86, late: 2 },
  { date: '2024-04-27', present: 90, absent: 10, onTime: 88, late: 2 },
  { date: '2024-04-28', present: 91, absent: 9, onTime: 89, late: 2 },
  { date: '2024-04-29', present: 89, absent: 11, onTime: 87, late: 2 },
  { date: '2024-04-30', present: 87, absent: 13, onTime: 85, late: 2 },
];

const chartConfig = {
  attendance: {
    label: 'Attendance',
  },
  present: {
    label: 'Present',
    color: 'hsl(var(--chart-1))',
  },
  absent: {
    label: 'Absent',
    color: 'hsl(var(--chart-2))',
  },
  onTime: {
    label: 'On Time',
    color: 'hsl(var(--chart-3))',
  },
  late: {
    label: 'Late',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig;

export function ReportCharts() {
  const [timeRange, setTimeRange] = React.useState('30d');

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const now = new Date(chartData[chartData.length - 1].date);
    let daysToSubtract = 30;
    if (timeRange === '14d') {
      daysToSubtract = 14;
    } else if (timeRange === '7d') {
      daysToSubtract = 7;
    }
    now.setDate(now.getDate() - daysToSubtract);
    return date >= now;
  });

  return (
    <Card className='bg-background shadow-none border-[0.1px]'>
      <CardHeader className='flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row'>
        <div className='grid flex-1 gap-1 text-center sm:text-left'>
          <CardTitle>Attendance Report</CardTitle>
          <CardDescription>
            Showing attendance data for the selected period
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className='w-[160px] rounded-lg sm:ml-auto'
            aria-label='Select a time range'
          >
            <SelectValue placeholder='Last 30 days' />
          </SelectTrigger>
          <SelectContent className='rounded-xl'>
            <SelectItem value='30d' className='rounded-lg'>
              Last 30 days
            </SelectItem>
            <SelectItem value='14d' className='rounded-lg'>
              Last 14 days
            </SelectItem>
            <SelectItem value='7d' className='rounded-lg'>
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[250px] w-full'
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id='fillPresent' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-present)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-present)'
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id='fillAbsent' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-absent)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-absent)'
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id='fillOnTime' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-onTime)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-onTime)'
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id='fillLate' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-late)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-late)'
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
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
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    });
                  }}
                  indicator='dot'
                />
              }
            />
            <Area
              dataKey='absent'
              type='monotone'
              fill='url(#fillAbsent)'
              stroke='var(--color-absent)'
              stackId='a'
            />
            <Area
              dataKey='present'
              type='monotone'
              fill='url(#fillPresent)'
              stroke='var(--color-present)'
              stackId='a'
            />
            <Area
              dataKey='onTime'
              type='monotone'
              fill='url(#fillOnTime)'
              stroke='var(--color-onTime)'
              stackId='a'
            />
            <Area
              dataKey='late'
              type='monotone'
              fill='url(#fillLate)'
              stroke='var(--color-late)'
              stackId='a'
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
