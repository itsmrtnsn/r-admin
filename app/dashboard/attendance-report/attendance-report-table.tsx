import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const tableHeadeers = [
  { label: 'Employee', value: 'employee' },
  { label: 'Total Present', value: 'total_present' },
  { label: 'Total Absent', value: 'total_absent' },
  { label: 'Late Check In', value: 'on_time_check_in' },
  { label: 'Early Check Out', value: 'early_check_out' },
  { label: 'Performance', value: 'Performance' },
];

const attendanceData = [
  {
    id: 1,
    name: 'Alice Johnson',
    present: 22,
    absent: 1,
    early_check_out: 2,
    late_check_in: 2,
    performance: 80,
  },
  {
    id: 2,
    name: 'Bob Smith',
    present: 20,
    absent: 3,
    early_check_out: 2,
    late_check_in: 2,
    performance: 80,
  },
  {
    id: 3,
    name: 'Carol Williams',
    present: 23,
    absent: 0,
    early_check_out: 2,
    late_check_in: 2,
    performance: 80,
  },
  {
    id: 4,
    name: 'David Brown',
    present: 21,
    absent: 2,
    early_check_out: 2,
    late_check_in: 2,
    performance: 80,
  },
  {
    id: 5,
    name: 'Eve Green',
    present: 24,
    absent: 0,
    early_check_out: 2,
    late_check_in: 2,
    performance: 80,
  },
];
const AttendanceReportTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className=''>
            <Checkbox />
          </TableHead>
          {tableHeadeers.map((header, index) => (
            <TableHead key={index} className='font-medium'>
              {header.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {attendanceData.map((item, index) => (
          <TableRow key={index} className='h-12 text-sms'>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.present}</TableCell>
            <TableCell>{item.absent}</TableCell>
            <TableCell>{item.early_check_out}</TableCell>
            <TableCell>{item.late_check_in}</TableCell>
            <TableCell>{item.performance}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AttendanceReportTable;
