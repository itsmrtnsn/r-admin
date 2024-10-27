import CurrentPath from '@/components/curren-path';
import { DatePicker } from '@/components/date-picker';
import Search from '@/components/search';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Suspense } from 'react';
import EmployeeSummaryCardSkeleton from '../employees/employee-summary-card-loading';
import CustomerSummaryCards from './customer-summary-cards';
import CustomerTable from './customer-table';
import customers from './customers';
import getcustomers from './customers';
import Pagination from '@/components/pagination';
import NewCustomerButton from './new-customer-button';

const CustomersPage = async () => {
  const customers = await getcustomers();
  return (
    <div className='p-4 space-y-6'>
      <div className='flex justify-between items-center'>
        <CurrentPath />
        <DatePicker />
      </div>
      <ScrollArea className='h-[80vh]'>
        <div className='space-y-10'>
          <Suspense fallback={<EmployeeSummaryCardSkeleton />}>
            <CustomerSummaryCards
              totalCustomers={100}
              activeCustomers={59}
              men={10}
              women={20}
            />
          </Suspense>

          <Card className='border-[0.1px] bg-slate-50/50 shadow-none flex-1 overflow-hidden'>
            <CardHeader>
              <div className='flex items-center gap-2 justify-between'>
                <Search />
                <NewCustomerButton />
              </div>
            </CardHeader>
            <CardContent>
              <CustomerTable customers={customers!} />
              <Pagination totalPages={0} currentPage={0} itemsPerPage={0} />
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default CustomersPage;
