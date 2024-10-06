import CurrentPath from '@/components/curren-path';
import { DatePicker } from '@/components/date-picker';
import Pagination from '@/components/pagination';
import Search from '@/components/search';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FaThList } from 'react-icons/fa';
import { IoIdCardSharp } from 'react-icons/io5';
import AddEmployee from './add-employee';
import EmployeeSummaryCard from './employee-summary-cards';
import EmployeeTable from './employee-table';
import { tableData } from './data';
const Employees = () => {
  return (
    <div className='p-4 space-y-6'>
      <div className='flex justify-between items-center'>
        <CurrentPath />
        <DatePicker />
      </div>
      <EmployeeSummaryCard />

      <Card className='border-[0.1px] bg-background shadow-none flex-1'>
        <CardHeader>
          <div className='flex items-center gap-2 justify-between'>
            <Search />
            <div className='flex items-center gap-6'>
              <div className='flex items-center gap-3'>
                <FaThList className='w-6 h-6 text-muted-foreground cursor-pointer hover:text-primary transition-all duration-300' />
                <IoIdCardSharp className='w-6 h-6 text-muted-foreground cursor-pointer hover:text-primary transition-all duration-300' />
              </div>
              <AddEmployee />
            </div>
          </div>
        </CardHeader>
        <ScrollArea className='h-[48vh]'>
          <CardContent className=''>
            <EmployeeTable employees={tableData} />
            <Pagination totalPages={10} currentPage={1} itemsPerPage={10} />
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default Employees;
