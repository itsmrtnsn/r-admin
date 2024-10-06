import { Badge } from '@/components/ui/badge';
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
import EmployeeStatusBadge from './employee-status-badge';

const tableHeaders = [
  { label: 'Identifiant', value: 'employee_id' },
  { label: 'Employé', value: 'name' },
  { label: 'Statut', value: 'status' },
  { label: 'Téléphone', value: 'phone_number' },
  { label: 'Poste', value: 'position' },
  { label: 'Shift', value: 'shift' },
];

type Employee = {
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  position: string;
  shift: string;
  status: string;
};

interface Props {
  employees: Employee[];
}

const EmployeeTable = ({ employees }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
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
            <TableCell className=''>{employee.employee_id}</TableCell>
            <TableCell className=''>
              <div className='flex  items-center gap-2'>
                <UserAvatar />
                <div className=''>
                  <p className='font-medium flex items-center gap-2'>
                    <span>{employee.first_name}</span>
                    <span>{employee.last_name}</span>
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
            <TableCell className=''>{employee.phone_number}</TableCell>

            <TableCell className=''>{employee.position}</TableCell>
            <TableCell className=''>{employee.shift}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EmployeeTable;
