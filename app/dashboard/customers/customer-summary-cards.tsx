import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { FaFemale, FaMale, FaUser } from 'react-icons/fa';
import { FaCircleHalfStroke } from 'react-icons/fa6';

interface Props {
  totalCustomers: number;
  activeCustomers: number;
  men: number;
  women: number;
}

const CustomerSummaryCards = ({
  totalCustomers,
  activeCustomers,
  women,
  men,
}: Props) => {
  const summaryCards = [
    {
      title: `Total employés`,
      slug: 'total-employees',
      value: totalCustomers,
      icon: FaUser,
    },
    {
      title: 'Employés actifs',
      slug: 'active-employees',
      value: activeCustomers,
      icon: FaCircleHalfStroke,
    },
    {
      title: 'Hommes',
      slug: 'male',
      value: men,
      icon: FaMale,
    },
    {
      title: 'Femmes',
      slug: 'female',
      value: women,
      icon: FaFemale,
    },
  ];
  return (
    <div className='grid grid-cols-4 gap-4'>
      {summaryCards.map((card) => (
        <Card
          key={card.title}
          className='border-[0.1px] shadow-none bg-slate-50/50 '
        >
          <CardHeader>
            <CardTitle className='text-sm font-medium flex items-center gap-2 justify-between'>
              <p>{card.title}</p>
              <card.icon
                className={cn(
                  'w-5 h-5 text-blue-600 shrink-0',
                  card.slug === 'total-employees'
                    ? 'text-blue-700'
                    : card.slug === 'active-employees'
                    ? 'text-green-600'
                    : card.slug === 'male'
                    ? 'text-purple-600'
                    : 'text-pink-600'
                )}
              />
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

export default CustomerSummaryCards;
