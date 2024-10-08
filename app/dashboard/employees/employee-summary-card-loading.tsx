import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

import { FaFemale, FaMale, FaUser } from 'react-icons/fa';
import { FaCircleHalfStroke } from 'react-icons/fa6';
const EmployeeSummaryCardSkeleton = () => {
  const cards = [
    {
      title: `Total employés`,
      slug: 'total-employees',
      value: 0,
      icon: FaUser,
    },
    {
      title: 'Employés actifs',
      slug: 'active-employees',
      value: 0,
      icon: FaCircleHalfStroke,
    },
    {
      title: 'Hommes',
      slug: 'male',
      value: 0,
      icon: FaMale,
    },
    {
      title: 'Femmes',
      slug: 'female',
      value: 0,
      icon: FaFemale,
    },
  ];
  return (
    <div className='grid grid-cols-4 gap-4'>
      {cards.map((card) => (
        <Card
          key={card.title}
          className='border-[0.1px] shadow-none bg-[#0a0a0a] '
        >
          <CardHeader>
            <CardTitle className='text-sm font-medium flex items-center gap-2 justify-between'>
              <Skeleton className='w-full h-full' />
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
            <p className='text-3xl font-semibold'>
              <Skeleton className='w-full h-full' />
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
export default EmployeeSummaryCardSkeleton;
