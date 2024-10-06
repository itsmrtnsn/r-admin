import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { FaFemale, FaMale, FaUser } from 'react-icons/fa';
import { FaCircleHalfStroke } from 'react-icons/fa6';

const summaryCards = [
  {
    title: 'Total Employees',
    description: 'Total Active Employees',
    value: 20,
    icon: FaUser,
  },
  {
    title: 'Active Employees',
    value: 17,
    icon: FaCircleHalfStroke,
  },
  {
    title: 'Male',
    description: '3% Increased from yesterday',
    value: 16,
    icon: FaMale,
  },
  {
    title: 'Female',
    description: '3% Increased from yesterday',
    value: 1,
    icon: FaFemale,
  },
];

const EmployeeSummaryCard = () => {
  return (
    <div className='grid grid-cols-4 gap-4'>
      {summaryCards.map((card) => (
        <Card
          key={card.title}
          className='border-[0.1px] shadow-none bg-background'
        >
          <CardHeader>
            <CardTitle className='text-sm font-medium flex items-center gap-2 justify-between'>
              <p>{card.title}</p>
              <card.icon
                className={cn(
                  'w-5 h-5 text-blue-500 shrink-0',
                  card.title === 'Total Employees'
                    ? 'text-blue-500'
                    : card.title === 'Active Employees'
                    ? 'text-green-500'
                    : card.title === 'Male'
                    ? 'text-purple-500'
                    : 'text-pink-500'
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

export default EmployeeSummaryCard;
