import { Card, CardContent, CardHeader } from '@/components/ui/card';

import CurrentPath from '@/components/curren-path';
import { DatePicker } from '@/components/date-picker';
import Pagination from '@/components/pagination';
import Search from '@/components/search';
import AttendanceSummaryCard from './attendance-summary';
import AttendanceTable from './attendance-table';

const Attendance = () => {
  return (
    <div className='p-4 space-y-6'>
      <div className='flex justify-between items-center'>
        <CurrentPath />
        <DatePicker />
      </div>
      <AttendanceSummaryCard />
      <Card className='border-[0.1px] border-slate-300 shadow-none'>
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
    </div>
  );
};

export default Attendance;
