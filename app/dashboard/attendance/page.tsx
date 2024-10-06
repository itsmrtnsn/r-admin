import { Card, CardContent, CardHeader } from '@/components/ui/card';

import CurrentPath from '@/components/curren-path';
import { DatePicker } from '@/components/date-picker';
import Pagination from '@/components/pagination';
import Search from '@/components/search';
import AttendanceSummaryCard from './attendance-summary';
import AttendanceTable from './attendance-table';
import { ScrollArea } from '@/components/ui/scroll-area';

const Attendance = () => {
  return (
    <div className='p-4 space-y-6'>
      <div className='flex justify-between items-center mb-8'>
        <CurrentPath />
        <DatePicker />
      </div>
      <ScrollArea className='h-[80vh]'>
        <AttendanceSummaryCard />
        <Card className='border-[0.1px] bg-background shadow-none mt-8'>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <Search />
            </div>
          </CardHeader>
          <CardContent>
            <AttendanceTable />
            <Pagination totalPages={10} currentPage={1} itemsPerPage={10} />
          </CardContent>
        </Card>
      </ScrollArea>
    </div>
  );
};

export default Attendance;
