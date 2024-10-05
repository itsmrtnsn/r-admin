import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const tableHeaders = [
  { label: 'Employee ID', value: 'employee_id' },
  { label: 'First Name', value: 'first_name' },
  { label: 'Last Name', value: 'last_name' },
  { label: 'Phone Number', value: 'phone_number' },
  { label: 'Position', value: 'position' },
  { label: 'Shift', value: 'shift' },
];

type Employee = {
  employee_id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  position: string;
  shift: string;
};

interface Props {
  employees: Employee[];
}

const EmployeeTable = ({ employees }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {tableHeaders.map((header) => (
            <TableHead className='text-black' key={header.value}>
              {header.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.map((employee) => (
          <TableRow className='h-12'>
            <TableCell className='text-slate-700'>
              {employee.employee_id}
            </TableCell>
            <TableCell className='text-slate-700'>
              {employee.first_name}
            </TableCell>
            <TableCell className='text-slate-700'>
              {employee.last_name}
            </TableCell>
            <TableCell className='text-slate-700'>
              {employee.phone_number}
            </TableCell>
            <TableCell className='text-slate-700'>
              {employee.position}
            </TableCell>
            <TableCell className='text-slate-700'>{employee.shift}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EmployeeTable;
