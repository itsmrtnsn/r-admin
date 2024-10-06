import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AttendanceReportSummary from './attendance-report-summary';
import AttendanceReportTable from './attendance-report-table';
import CurrentPath from '@/components/curren-path';
import { DatePicker } from '@/components/date-picker';
import Pagination from '@/components/pagination';
import Search from '@/components/search';
import { ReportCharts } from './report-charts';
import { ScrollArea } from '@/components/ui/scroll-area';

const AttendanceReport = () => {
  return (
    <div className='p-4 space-y-8'>
      <div className='flex justify-between items-center'>
        <CurrentPath />
        <DatePicker />
      </div>
      <AttendanceReportSummary />
      <ScrollArea className='w-full h-[60vh] pb-4'>
        <div className='flex flex-col gap-6'>
          <ReportCharts />
          <Card className='shadow-none border-[0.1px] bg-background mt-4'>
            <CardHeader className='pb-3'>
              <Search />
            </CardHeader>
            <CardContent>
              <AttendanceReportTable />
              <Pagination totalPages={10} currentPage={1} itemsPerPage={10} />
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AttendanceReport;
