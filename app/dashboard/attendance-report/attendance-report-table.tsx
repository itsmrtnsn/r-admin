import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

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
    present: 14,
    absent: 0,
    early_check_out: 1,
    late_check_in: 1,
    performance: 80,
  },
  {
    id: 2,
    name: 'Bob Smith',
    present: 14,
    absent: 3,
    early_check_out: 2,
    late_check_in: 2,
    performance: 80,
  },
  {
    id: 3,
    name: 'Carol Williams',
    present: 14,
    absent: 0,
    early_check_out: 2,
    late_check_in: 2,
    performance: 80,
  },
  {
    id: 4,
    name: 'David Brown',
    present: 14,
    absent: 2,
    early_check_out: 2,
    late_check_in: 2,
    performance: 80,
  },
  {
    id: 5,
    name: 'Eve Green',
    present: 14,
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
          <TableRow key={index} className='h-14 text-sm'>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.present}</TableCell>
            <TableCell>{item.absent}</TableCell>
            <TableCell>{item.early_check_out}</TableCell>
            <TableCell>{item.late_check_in}</TableCell>
            <TableCell
              className={cn('font-medium', {
                'text-green-700': item.performance >= 98,
                'text-yellow-500':
                  item.performance >= 94 && item.performance < 98,
                'text-red-700': item.performance < 90,
              })}
            >
              {calculatePerformanceScore(
                14,
                item.present,
                item.absent,
                item.early_check_out,
                item.late_check_in
              ).toFixed(0)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AttendanceReportTable;

const calculatePerformanceScore = (
  totalWorkingDays: number,
  totalPresent: number,
  totalAbsent: number,
  earlyCheckOut: number,
  lateCheckIn: number
) => {
  const attendanceRate = (totalPresent / totalWorkingDays) * 100;
  const absenceRate = (totalAbsent / totalWorkingDays) * 100;
  const earlyCheckOutPenalty = earlyCheckOut * 2; // Assuming each early check-out deducts 2 points
  const lateCheckInPenalty = lateCheckIn * 2; // Assuming each late check-in deducts 2 points

  // Calculate the performance score
  let score: number =
    attendanceRate - absenceRate - earlyCheckOutPenalty - lateCheckInPenalty;
  // Ensure the score is within the range of 0 to 100
  score = Math.max(0, Math.min(100, score));

  return score;
};
