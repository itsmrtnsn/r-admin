import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { FaUser } from 'react-icons/fa';
import { FaCircleHalfStroke, FaUserClock } from 'react-icons/fa6';
import { IoMdClock } from 'react-icons/io';

const summaryCards = [
  {
    title: 'Employé actif',
    description: 'Total Employés',
    slug: 'total-employes',
    value: 0,
    icon: FaUser,
  },
  {
    title: "Présent aujourd'hui",
    slug: 'present-aujourd-hui',
    value: 0,
    icon: FaCircleHalfStroke,
  },
  {
    title: "Check In à l'heure",
    slug: 'check-in-a-l-heure',
    value: 0,
    icon: FaUserClock,
  },
  {
    title: 'Check In en retard',
    slug: 'check-in-en-retard',
    value: 0,
    icon: IoMdClock,
  },
];

interface Props {
  totalActiveEmployees: number;
  presentToday: number;
  checkInOnTime: number;
  checkInLate: number;
}

const AttendanceSummary = ({
  totalActiveEmployees,
  presentToday,
  checkInOnTime,
  checkInLate,
}: Props) => {
  return (
    <div className='grid grid-cols-4 gap-4'>
      {summaryCards.map((card) => (
        <Card
          key={card.title}
          className='border-[0.1px] bg-[#0a0a0a] shadow-none'
        >
          <CardHeader>
            <CardTitle className='text-sm flex items-center gap-2 justify-between'>
              <p className='font-medium'>{card.title}</p>
              <card.icon
                className={cn(
                  'w-5 h-5 text-purple-500 shrink-0',
                  card.slug === 'total-employes'
                    ? 'text-purple-500'
                    : card.slug === 'present-aujourd-hui'
                    ? 'text-blue-700'
                    : card.slug === 'check-in-a-l-heure'
                    ? 'text-green-500'
                    : card.slug === 'check-in-en-retard'
                    ? 'text-red-500'
                    : ''
                )}
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-semibold'>
              {card.slug === 'total-employes'
                ? totalActiveEmployees
                : card.slug === 'present-aujourd-hui'
                ? presentToday
                : card.slug === 'check-in-a-l-heure'
                ? checkInOnTime
                : card.slug === 'check-in-en-retard'
                ? checkInLate
                : ''}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AttendanceSummary;
