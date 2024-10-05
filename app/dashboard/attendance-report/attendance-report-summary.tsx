import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
        <Card
          key={index}
          className='shadow-none border-[0.1px] border-slate-300'
        >
          <CardHeader className='flex flex-row items-center justify-between space-y-0 '>
            <CardTitle className='text-xs font-normal'>{item.name}</CardTitle>
            <item.icon className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-semibold'>{item.value}%</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AttendanceReportSummary;
