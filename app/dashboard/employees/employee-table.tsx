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
            <TableRow className='h-14  border-b-[0.1px]'>
              <TableCell className=''>
                <Checkbox />
              </TableCell>
              <TableCell className=''>{employee.id}</TableCell>
              <TableCell className=''>
                <div className='flex  items-center gap-2'>
                  <UserAvatar
                    fallback={employee.firstName[0] + employee.lastName[0]}
                  />
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
              <TableCell className=''>{employee.phone}</TableCell>

              <TableCell className=''>{employee.position}</TableCell>
              <TableCell className=''>
                {employee.shiftStart.toTimeString()} -{' '}
                {employee.shiftEnd.toTimeString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmployeeTable;
