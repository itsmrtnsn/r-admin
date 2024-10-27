import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Package, PackageMinus, ShoppingCart } from 'lucide-react';

const ProductDetailSummaryCard = () => {
  const cards = [
    {
      id: 1,
      label: 'Quantity Sold',
      value: 10,
      icon: ShoppingCart,
    },
    {
      id: 2,
      label: 'Total Revenue',
      value: 250,
      icon: DollarSign,
    },
    {
      id: 3,
      label: 'Quantity Waste',
      value: 3,
      icon: PackageMinus,
    },
    {
      id: 4,
      label: 'Quantity InStock',
      value: 300,
      icon: Package,
    },
  ];
  return (
    <div className='grid grid-cols-4 gap-4'>
      {cards.map((card) => (
        <Card
          key={card.id}
          className='bg-slate-50/50 shadow-none border-[0.1px]'
        >
          <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
            <CardTitle className='text-sm font-medium'>{card.label}</CardTitle>
            <card.icon className='w-4 h-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-semibold'>${card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductDetailSummaryCard;
