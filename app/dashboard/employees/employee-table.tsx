import { Checkbox } from '@/components/ui/checkbox';
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
import EmployeeStatusBadge from './employee-status-badge';
import { format } from 'date-fns';
import { Ellipsis } from 'lucide-react';
import TableAction from './table-action';

const tableHeaders = [
  { label: 'Identifiant', value: 'employee_id' },
  { label: 'Employé', value: 'name' },
  { label: 'Statut', value: 'status' },
  { label: 'Téléphone', value: 'phone_number' },
  { label: 'Poste', value: 'position' },
  { label: 'Shift', value: 'shift' },
  { label: 'Actions', value: 'actions' },
];

interface Props {
  employees: Employee[];
}

const EmployeeTable = ({ employees }: Props) => {
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
          {employees.map((employee) => (
            <TableRow key={employee.id} className='h-14  border-b-[0.1px]'>
              <TableCell className=''>
                <Checkbox />
              </TableCell>
              <TableCell className=''>{employee.id}</TableCell>
              <TableCell className=''>
                <div className='flex  items-center gap-2'>
                  {/* <UserAvatar
                    fallback={employee.firstName[0] + employee.lastName[0]}
                  /> */}
                  <div className=''>
                    <p className='font-medium flex items-center gap-2'>
                      <span>{employee.firstName}</span>
                      <span>{employee.lastName}</span>
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      {employee.email}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className=''>
                <EmployeeStatusBadge status={employee.status} />
              </TableCell>
              <TableCell className='text-nowrap'>{employee.phone}</TableCell>

              <TableCell className=''>{employee.position}</TableCell>
              <TableCell className='text-nowrap'>
                {format(employee.shiftStart, 'HH:mm')} -
                {format(employee.shiftEnd, 'HH:mm')}
              </TableCell>
              <TableCell className=''>
                <TableAction employeeId={employee.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmployeeTable;
