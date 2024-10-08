import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import UserAvatar from '@/components/user-avatar';
import { Employee } from '@prisma/client';

const tableHeaders = [
  { label: 'Identifiant', value: 'employee_id' },
  { label: 'Employé', value: 'name' },
  { label: 'Statut', value: 'status' },
  { label: 'Téléphone', value: 'phone_number' },
  { label: 'Poste', value: 'position' },
  { label: 'Shift', value: 'shift' },
];

interface Props {
  employees: Employee[];
}

const EmployeeTableSkeleton = () => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className='h-14 hover:rounded-lg'>
            <TableHead>
              <Checkbox />
            </TableHead>
            {tableHeaders.map((header) => (
              <TableHead key={header.value}>{header.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3, 4, 5].map((employee, index) => (
            <TableRow key={index} className='h-14  border-b-[0.1px]'>
              <TableCell className=''>
                <Checkbox />
              </TableCell>
              <TableCell className=''>{index}</TableCell>
              <TableCell className=''>
                <div className='flex  items-center gap-2'>
                  <UserAvatar fallback={'' + ''} />
                  <div className=''>
                    <p className='font-medium flex items-center gap-2'>
                      <span>
                        <Skeleton className='w-4 h-4' />
                      </span>
                      <span>
                        <Skeleton className='w-4 h-4' />
                      </span>
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      <Skeleton className='w-4 h-4' />
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className=''>
                <Skeleton className='w-4 h-4' />
              </TableCell>
              <TableCell className=''>
                <Skeleton className='w-4 h-4' />
              </TableCell>

              <TableCell className=''>
                <Skeleton className='w-4 h-4' />
              </TableCell>
              <TableCell className=''>
                <Skeleton className='w-4 h-4' />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmployeeTableSkeleton;
