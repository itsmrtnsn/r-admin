'use client';

import { addDays, format } from 'date-fns';
import {
  CalendarIcon,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import CurrentPath from '@/components/curren-path';
import SalesCategoryDistribution from './sale-category-distribution';

// Placeholder data
const dailySalesData = [
  {
    date: '2023-06-01',
    total: 2400,
    food: 1200,
    drinks: 800,
    merchandise: 400,
  },
  { date: '2023-06-02', total: 1398, food: 700, drinks: 500, merchandise: 198 },
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

const categorySalesData = [
  { name: 'Food', value: 15500 },
  { name: 'Drinks', value: 11100 },
  { name: 'Merchandise', value: 3806 },
];

const topProductsData = [
  { name: 'Burger Deluxe', category: 'Food', sales: 4000 },
  { name: 'Craft Beer', category: 'Drinks', sales: 3000 },
  { name: 'Caesar Salad', category: 'Food', sales: 2000 },
  { name: 'Souvenir T-Shirt', category: 'Merchandise', sales: 2780 },
  { name: 'Mojito', category: 'Drinks', sales: 1890 },
];

const recentTransactions = [
  {
    id: 'INV001',
    date: '2023-06-07',
    amount: 100.0,
    items: 3,
    category: 'Food',
  },
  {
    id: 'INV002',
    date: '2023-06-07',
    amount: 75.5,
    items: 2,
    category: 'Drinks',
  },
  {
    id: 'INV003',
    date: '2023-06-06',
    amount: 220.0,
    items: 5,
    category: 'Mixed',
  },
  {
    id: 'INV004',
    date: '2023-06-06',
    amount: 50.0,
    items: 1,
    category: 'Merchandise',
  },
  {
    id: 'INV005',
    date: '2023-06-05',
    amount: 180.0,
    items: 4,
    category: 'Food',
  },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function EnhancedSalesReport() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -7),
    to: new Date(),
  });
  const [selectedCategory, setSelectedCategory] = useState('all');

  const totalRevenue = dailySalesData.reduce((sum, day) => sum + day.total, 0);
  const totalSales = recentTransactions.length;
  const averageOrderValue = totalRevenue / totalSales;

  return (
    <div className='p-8'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4'>
        <CurrentPath />
        <div className='flex flex-col sm:flex-row gap-4'>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className='w-[280px] justify-start text-left font-normal'
              >
                <CalendarIcon className='mr-2 h-4 w-4' />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, 'LLL dd, y')} -{' '}
                      {format(date.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(date.from, 'LLL dd, y')
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='end'>
              <Calendar
                initialFocus
                mode='range'
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Select category' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Categories</SelectItem>
              <SelectItem value='food'>Food</SelectItem>
              <SelectItem value='drinks'>Drinks</SelectItem>
              <SelectItem value='merchandise'>Merchandise</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card className='bg-slate-50/50 shadow-none border-[0.1px]'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>${totalRevenue.toFixed(2)}</div>
            <p className='text-xs text-muted-foreground'>
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className='bg-slate-50/50 shadow-none border-[0.1px]'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Sales</CardTitle>
            <ShoppingCart className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{totalSales}</div>
            <p className='text-xs text-muted-foreground'>
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className='bg-slate-50/50 shadow-none border-[0.1px]'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Active Customers
            </CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>+573</div>
            <p className='text-xs text-muted-foreground'>
              +201 since last week
            </p>
          </CardContent>
        </Card>
        <Card className='bg-slate-50/50 shadow-none border-[0.1px]'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Average Order Value
            </CardTitle>
            <TrendingUp className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              ${averageOrderValue.toFixed(2)}
            </div>
            <p className='text-xs text-muted-foreground'>
              +12.5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-8'>
        <Card className='col-span-4'>
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
        <SalesCategoryDistribution />
        {/* <Card className='col-span-3'>
          <CardHeader>
            <CardTitle>Sales Distribution by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={350}>
              <PieChart>
                <Pie
                  data={categorySalesData}
                  cx='50%'
                  cy='50%'
                  labelLine={false}
                  outerRadius={80}
                  fill='#8884d8'
                  dataKey='value'
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {categorySalesData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card> */}
      </div>

      <div className='grid gap-4 md:grid-cols-2 mt-8'>
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>Top 5 products by sales volume</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={350}>
              <BarChart data={topProductsData}>
                <XAxis
                  dataKey='name'
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
                <Bar dataKey='sales' fill='#8884d8' radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest 5 transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className='font-medium'>
                      {transaction.id}
                    </TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                    <TableCell>{transaction.category}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
