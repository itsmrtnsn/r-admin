import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EmployeeSummaryCard from './employee-summary-cards';
import EmployeeTable from './employee-table';
import Pagination from '@/components/pagination';
import { DatePicker } from '@/components/date-picker';
import CurrentPath from '@/components/curren-path';
import Search from '@/components/search';

const Employees = () => {
  return (
    <div className='p-4 space-y-6'>
      <div className='flex justify-between items-center'>
        <CurrentPath />
        <DatePicker />
      </div>
      <EmployeeSummaryCard />
      <Card className='border-[0.1px] border-slate-300 shadow-none'>
        <CardHeader>
          <div className='flex items-center gap-2'>
            <Search />
          </div>
        </CardHeader>
        <CardContent>
          <EmployeeTable />
          <Pagination totalPages={10} currentPage={1} itemsPerPage={10} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Employees;
