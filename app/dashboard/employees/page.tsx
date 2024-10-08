import CurrentPath from '@/components/curren-path';
import { DatePicker } from '@/components/date-picker';
import Pagination from '@/components/pagination';
import Search from '@/components/search';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Suspense } from 'react';
import AddEmployee from './add-employee';

import { getEmployees } from '../_actions/get-employees';
import EmployeeSummaryCardSkeleton from './employee-summary-card-loading';
import EmployeeSummaryCard from './employee-summary-cards';
import EmployeeTable from './employee-table';
import EmptyEmployee from './empty-employee';
import EmployeeTableSkeleton from './employee-table-skeleton';

const Employees = async () => {
  const employees = await getEmployees();

  return (
    <div className='p-4 space-y-6'>
      <div className='flex justify-between items-center'>
        <CurrentPath />
        <DatePicker />
      </div>
      <ScrollArea className='h-[80vh]'>
        <div className='space-y-10'>
          <Suspense fallback={<EmployeeSummaryCardSkeleton />}>
            <EmployeeSummaryCard />
          </Suspense>
          <Card className='border-[0.1px] bg-[#0a0a0a] shadow-none flex-1 overflow-hidden'>
            <CardHeader>
              <div className='flex items-center gap-2 justify-between'>
                <Search />
                <AddEmployee />
              </div>
            </CardHeader>
            <CardContent>
              {employees.length > 0 ? (
                <Suspense fallback={<EmployeeTableSkeleton />}>
                  <EmployeeTable employees={employees} />
                  <Pagination
                    totalPages={10}
                    currentPage={1}
                    itemsPerPage={10}
                  />
                </Suspense>
              ) : (
                <EmptyEmployee />
              )}
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Employees;
