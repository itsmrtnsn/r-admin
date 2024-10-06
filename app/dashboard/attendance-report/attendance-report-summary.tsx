import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Calendar, Clock, Users } from 'lucide-react';

const reportSummary = [
  {
    name: 'Total Working Days',
    value: 100,
    icon: Calendar,
  },
  {
    name: 'Present Rate',
    value: 37,
    icon: Users,
  },
  {
    name: 'On Time Rate',
    value: 87,
    icon: Clock,
  },
  {
    name: 'Late Rate',
    value: 50,
    icon: Clock,
  },
];

const AttendanceReportSummary = () => {
  return (
    <div className='grid grid-cols-4 gap-4'>
      {reportSummary.map((item, index) => (
        <Card key={index} className='shadow-none border-[0.1px] bg-background'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 '>
            <CardTitle className='text-sm font-medium text-muted-foreground'>
              {item.name}
            </CardTitle>
            <item.icon
              className={cn('w-5 h-5 text-muted-foreground', {
                'text-red-600': item.name === 'Late Rate',
                'text-green-600': item.name === 'On Time Rate',
                'text-blue-600': item.name === 'Present Rate',
              })}
            />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-semibold'>{item.value}%</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AttendanceReportSummary;
