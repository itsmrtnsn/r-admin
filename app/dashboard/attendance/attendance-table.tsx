import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import EmployeeStatusBadge from '../employees/employee-status-badge';

const tableHeaders = [
  { label: 'EmployeeID', value: 'employee_id' },
  { label: 'Name', value: 'name' },
  { label: 'Status', value: 'status' },
  { label: 'Check In', value: 'check_in' },
  { label: 'Check Out', value: 'check_out' },
  { label: 'Date', value: 'date' },
];

const tableData = [
  {
    employee_id: '123456',
    name: 'John Doe',
    status: 'present',
    check_in: '09:00 AM',
    check_out: '05:00 PM',
    date: '2024-01-01',
  },
  {
    employee_id: '123457',
    name: 'Jane Smith',
    status: 'present',
    check_in: '09:05 AM',
    check_out: '05:10 PM',
    date: '2024-01-01',
  },
  {
    employee_id: '123458',
    name: 'Alice Johnson',
    status: 'absent',
    check_in: '-',
    check_out: '-',
    date: '2024-01-01',
  },
  {
    employee_id: '123459',
    name: 'Bob Brown',
    status: 'present',
    check_in: '09:00 AM',
    check_out: '05:00 PM',
    date: '2024-01-01',
  },
  {
    employee_id: '123460',
    name: 'Charlie Davis',
    status: 'late',
    check_in: '09:15 AM',
    check_out: '05:00 PM',
    date: '2024-01-01',
  },
];

const AttendanceTable = () => {
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
        {tableData.map((data) => (
          <TableRow className='h-12'>
            <TableCell className='text-slate-700'>{data.employee_id}</TableCell>
            <TableCell className='text-slate-950'>{data.name}</TableCell>
            <TableCell>
              <EmployeeStatusBadge status={data.status} />
            </TableCell>
            <TableCell className='text-slate-950'>{data.check_in}</TableCell>
            <TableCell className='text-slate-700'>{data.check_out}</TableCell>
            <TableCell className='text-slate-700'>{data.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AttendanceTable;
