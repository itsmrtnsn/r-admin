import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Attendance } from '@prisma/client';
import CheckInStatusBadge from './check-in-status-badge';
import CheckOutStatusBadge from './check-out-status-badge';

const tableHeaders = [
  { label: 'Employé', value: 'name' },
  { label: 'Check In', value: 'check_in' },
  { label: 'Check In Status', value: 'check_in_status' },
  { label: 'Check Out', value: 'check_out' },
  { label: 'Check Out Status', value: 'check_out_status' },
  { label: 'Date', value: 'date' },
];

interface Props {
  attendanceData: (Attendance & {
    employee: {
      firstName: string;
      lastName: string;
      shiftStart: Date;
      shiftEnd: Date;
    };
  })[];
}

const AttendanceTable = ({ attendanceData }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='text-black'>
            <Checkbox />
          </TableHead>
          {tableHeaders.map((header) => (
            <TableHead key={header.value}>{header.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {attendanceData.map((data) => (
          <TableRow className='h-14' key={data.id}>
            <TableCell className=''>
              <Checkbox />
            </TableCell>
            <TableCell className=''>
              {data.employee.firstName} {data.employee.lastName}
            </TableCell>
            <TableCell className=''>
              {data.checkInTime?.toLocaleTimeString()
                ? data.checkOutTime?.toTimeString()
                : '-'}
            </TableCell>
            <TableCell>
              {data.checkInStatus ? (
                <CheckInStatusBadge status={data.checkInStatus} />
              ) : (
                '-'
              )}
            </TableCell>
            <TableCell className=''>
              {data.checkOutTime?.toLocaleTimeString()
                ? data.checkOutTime.toTimeString()
                : '-'}
            </TableCell>
            <TableCell>
              {data.checkOutStatus ? (
                <CheckOutStatusBadge status={data.checkOutStatus} />
              ) : (
                '-'
              )}
            </TableCell>
            <TableCell className=''>{data.date.toLocaleDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AttendanceTable;
