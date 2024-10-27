'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const DailySalesChart = () => {
  const dailySalesData = [
    {
      date: '2023-06-01',
      total: 2400,
      food: 1200,
      drinks: 800,
      merchandise: 400,
    },
    {
      date: '2023-06-02',
      total: 1398,
      food: 700,
      drinks: 500,
      merchandise: 198,
    },
    {
      date: '2023-06-03',
      total: 9800,
      food: 5000,
      drinks: 3500,
      merchandise: 1300,
    },
    {
      date: '2023-06-04',
      total: 3908,
      food: 2000,
      drinks: 1500,
      merchandise: 408,
    },
    {
      date: '2023-06-05',
      total: 4800,
      food: 2500,
      drinks: 1800,
      merchandise: 500,
    },
    {
      date: '2023-06-06',
      total: 3800,
      food: 1900,
      drinks: 1400,
      merchandise: 500,
    },
    {
      date: '2023-06-07',
      total: 4300,
      food: 2200,
      drinks: 1600,
      merchandise: 500,
    },
  ];

  return (
    <Card className=' shadow-none border-[0.1px] '>
      <CardHeader>
        <CardTitle>Daily Sales by Category</CardTitle>
      </CardHeader>
      <CardContent className='pl-2'>
        <ResponsiveContainer width='100%' height={350}>
          <LineChart data={dailySalesData}>
            <XAxis
              dataKey='date'
              stroke='#888888'
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke='#888888'
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip />
            <Legend />
            <Line
              type='monotone'
              dataKey='total'
              stroke='#8884d8'
              strokeWidth={2}
              name='Total'
            />
            <Line
              type='monotone'
              dataKey='food'
              stroke='#82ca9d'
              strokeWidth={2}
              name='Food'
            />
            <Line
              type='monotone'
              dataKey='drinks'
              stroke='#ffc658'
              strokeWidth={2}
              name='Drinks'
            />
            <Line
              type='monotone'
              dataKey='merchandise'
              stroke='#ff7300'
              strokeWidth={2}
              name='Merchandise'
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DailySalesChart;
