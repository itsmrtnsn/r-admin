import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AttendanceReportSummary from './attendance-report-summary';
import AttendanceReportTable from './attendance-report-table';
import CurrentPath from '@/components/curren-path';
import { DatePicker } from '@/components/date-picker';
import Pagination from '@/components/pagination';
import Search from '@/components/search';

const AttendanceReport = () => {
  return (
    <div className='p-4 space-y-6'>
      <div className='flex justify-between items-center'>
        <CurrentPath />
        <DatePicker />
      </div>
      <AttendanceReportSummary />
      <Card className='shadow-none border-[0.1px] border-slate-300'>
        <CardHeader className='pb-3'>
          <Search />
        </CardHeader>
        <CardContent>
          <AttendanceReportTable />
          <Pagination totalPages={10} currentPage={1} itemsPerPage={10} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceReport;
