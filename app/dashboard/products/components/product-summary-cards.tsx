import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { BookDashed, FileArchive, Package, ShieldCheck } from 'lucide-react';

interface Props {
  total: number;
  archieved: number;
  active: number;
  draft: number;
}

const ProductSummaryCards = ({ total, active, archieved, draft }: Props) => {
  const cards = [
    {
      id: 1,
      title: 'Total',
      description: '',
      value: total,
      icon: Package,
      iconColor: 'text-blue-600',
    },
    {
      id: 2,
      title: 'Actif',
      description: '',
      icon: ShieldCheck,
      value: active,
      iconColor: 'text-green-600',
    },
    {
      id: 2,
      title: 'Brouillon',
      description: '',
      icon: BookDashed,
      value: draft,
      iconColor: 'text-yellow-600',
    },
    {
      id: 2,
      title: 'Archivé',
      description: '',
      icon: FileArchive,
      value: archieved,
      iconColor: 'text-red-600',
    },
  ];
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
      {cards.map((card) => (
        <Card className='bg-slate-50 shadow-none border-[0.1px]' key={card.id}>
          <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
            <CardTitle className='text-sm font-medium'>{card.title}</CardTitle>
            <card.icon
              className={cn('w-4 h-4 text-muted-foreground', card.iconColor)}
            />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{card.value}</div>
            <p className='text-xs text-muted-foreground'>{card.description} </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductSummaryCards;
