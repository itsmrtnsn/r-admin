import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { DollarSign, ShoppingCart, TrendingUp, Users } from 'lucide-react';

interface Props {
  totalSalesValue: number;
  averageSalesValue: number;
  salesCount: number;
  newCustomers: number;
}

const ReportSummaryCard = ({
  totalSalesValue,
  averageSalesValue,
  salesCount,
  newCustomers,
}: Props) => {
  const cards = [
    {
      id: 1,
      label: 'Total Revenue',
      value: totalSalesValue,
      icon: DollarSign,
    },

    {
      id: 2,
      label: 'Total Sale',
      value: salesCount,
      icon: ShoppingCart,
    },

    { id: 3, label: 'New Customers', value: newCustomers, icon: Users },

    {
      id: 4,
      label: 'Average Sale Value',
      value: averageSalesValue,
      icon: TrendingUp,
    },
  ];
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      {cards.map((card) => (
        <Card
          key={card.id}
          className='bg-slate-50/50 shadow-none border-[0.1px]'
        >
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>{card.label}</CardTitle>
            <card.icon className={cn('h-4 w-4')} />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ReportSummaryCard;
