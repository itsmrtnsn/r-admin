import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  BookDashed,
  FileArchive,
  icons,
  Package,
  ShieldCheck,
} from 'lucide-react';

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
        <Card
          key={card.title}
          className='border-[0.1px] shadow-none bg-slate-50/50 '
        >
          <CardHeader>
            <CardTitle className='text-sm font-medium flex items-center gap-2 justify-between'>
              <p>{card.title}</p>
              <card.icon className={cn(card.iconColor)} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-3xl font-semibold'>{card.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductSummaryCards;
