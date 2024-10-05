import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaSun,
  FaTimesCircle,
} from 'react-icons/fa';

interface EmployeeStatusBadgeProps {
  status: 'present' | 'absent' | 'late' | 'day-off';
}

const statusIcons = {
  present: <FaCheckCircle className='w-3 h-3 text-green-500' />,
  absent: <FaTimesCircle className='w-3 h-3 text-red-500' />,
  late: <FaExclamationCircle className='w-3 h-3 text-yellow-500' />,
  'day-off': <FaSun className='w-3 h-3 text-gray-500' />,
};

const statusClasses = {
  present: 'bg-green-50 text-green-500 border-green-400 hover:bg-green-100',
  absent: 'bg-red-50 text-red-500 border-red-400 hover:bg-red-100',
  late: 'bg-yellow-50 text-yellow-500 border-yellow-400 hover:bg-yellow-100',
  'day-off': 'bg-gray-50 text-gray-500 border-gray-400 hover:bg-gray-100',
};

const statusLabels = {
  present: 'On Time',
  absent: 'Absent',
  late: 'Late',
  'day-off': 'Day Off',
};

const AttendanceStatusBadge = ({ status }: EmployeeStatusBadgeProps) => {
  return (
    <Badge
      variant='outline'
      className={cn(
        'rounded-none rounded-tl-sm rounded-br-sm border-[0.1px] text-xs font-medium',
        statusClasses[status]
      )}
    >
      <span className='inline-flex items-center'>
        {statusIcons[status]}
        <span className='ml-1.5'>{statusLabels[status]}</span>
      </span>
    </Badge>
  );
};

export default AttendanceStatusBadge;
