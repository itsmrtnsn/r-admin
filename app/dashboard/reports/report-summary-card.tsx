import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { DollarSign, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import reportSummary from './report-summary';

interface Props {
  startDate?: Date;
  endDate?: Date;
}

const ReportSummaryCard = async ({ startDate, endDate }: Props) => {
  const { totalRevenue, averageOrderValue, newCustomers, totalSales } =
    await reportSummary(startDate, endDate);
  const cards = [
    {
      id: 1,
      label: 'Ventes totales',
      value: `$${totalRevenue}`,
      icon: DollarSign,
    },

    {
      id: 2,
      label: 'Quantité vendue',
      value: `+${totalSales}`,
      icon: ShoppingCart,
    },

    {
      id: 3,
      label: 'Nouveaux clients',
      value: `+${newCustomers}`,
      icon: Users,
    },

    {
      id: 4,
      label: 'Ventes moyennes',
      value: `$${averageOrderValue}`,
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
            <CardTitle className='text-sm font-medium text-nowrap text-muted-foreground'>
              {card.label}
            </CardTitle>
            <card.icon className={cn('h-4 w-4 shrink-0')} />
          </CardHeader>
          <CardContent>
            <div className='text-xl font-bold'>{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ReportSummaryCard;
