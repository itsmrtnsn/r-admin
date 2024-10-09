import { Card, CardContent, CardHeader } from '@/components/ui/card';

import CurrentPath from '@/components/curren-path';
import { DatePicker } from '@/components/date-picker';
import Pagination from '@/components/pagination';
import Search from '@/components/search';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bug } from 'lucide-react';
import { Suspense } from 'react';
import { getAttendance } from '../_actions/get-attendance';
import AttendanceSummaryCard from './attendance-summary';
import AttendanceTable from './attendance-table';
import EmptyAttendance from './empty-attendace';

interface Props {
  searchParams: {
    search?: string;
    date?: string;
    page?: string;
  };
}

const Attendance = async ({ searchParams }: Props) => {
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const itemsPerPage = 10;
  const today = new Date();
  const { data, success } = await getAttendance(
    searchParams.search,
    today,
    currentPage,
    itemsPerPage
  );
  const totalPage =
    data?.attendanceRecords && typeof data.attendanceRecords === 'number'
      ? Math.ceil(data.attendanceRecords / 10)
      : 1;

  if (!success)
    return (
      <div className='m-10'>
        <Alert variant='destructive'>
          <Bug className='h-4 w-4' />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>{'Something went wrong'}</AlertDescription>
        </Alert>
      </div>
    );

  return (
    <div className='p-4 space-y-6'>
      <div className='flex justify-between items-center mb-8'>
        <CurrentPath />
        <DatePicker />
      </div>
      <ScrollArea className='h-[80vh]'>
        <AttendanceSummaryCard
          totalActiveEmployees={data?.totalActiveEmployees!}
          presentToday={data?.presentToday!}
          checkInOnTime={data?.checkInOnTime!}
          checkInLate={data?.checkInLate!}
        />
        <div className='mt-8'>
          <Card className='border-[0.1px] bg-background shadow-none '>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <Search />
              </div>
            </CardHeader>
            <CardContent>
              {!data?.attendanceRecords.length && <EmptyAttendance />}
              {data?.attendanceRecords.length && (
                <Suspense>
                  <AttendanceTable attendanceData={data?.attendanceRecords!} />
                  <Pagination
                    totalPages={totalPage}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                  />
                </Suspense>
              )}
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Attendance;
