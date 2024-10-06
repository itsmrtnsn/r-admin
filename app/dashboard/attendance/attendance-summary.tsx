import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { FaUser } from 'react-icons/fa';
import { FaCircleHalfStroke, FaUserClock } from 'react-icons/fa6';
import { IoMdClock } from 'react-icons/io';

const summaryCards = [
  {
    title: 'Total Employees',
    description: 'Total Active Employees',
    value: 20,
    icon: FaUser,
  },
  {
    title: 'Present Today',
    value: 17,
    icon: FaCircleHalfStroke,
  },
  {
    title: 'Check In On Time',
    description: '3% Increased from yesterday',
    value: 16,
    icon: FaUserClock,
  },
  {
    title: 'Check In Late',
    description: '3% Increased from yesterday',
    value: 1,
    icon: IoMdClock,
  },
];

const AttendanceSummary = () => {
  return (
    <div className='grid grid-cols-4 gap-4'>
      {summaryCards.map((card) => (
        <Card
          key={card.title}
          className='border-[0.1px] bg-background shadow-none'
        >
          <CardHeader>
            <CardTitle className='text-sm flex items-center gap-2 justify-between'>
              <p className='font-medium'>{card.title}</p>
              <card.icon
                className={cn(
                  'w-5 h-5 text-blue-500 shrink-0',
                  card.title === 'Total Employees'
                    ? 'text-blue-500'
                    : card.title === 'Present Today'
                    ? 'text-green-500'
                    : card.title === 'Check In On Time'
                    ? 'text-yellow-500'
                    : 'text-red-500'
                )}
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-semibold'>{card.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AttendanceSummary;
