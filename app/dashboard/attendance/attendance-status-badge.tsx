import { Badge } from '@/components/ui/badge';
import React from 'react';

const AttendanceStatusBadge = ({ status }: { status: string }) => {
  const getStatusDetails = (status: string) => {
    switch (status) {
      case 'present':
        return {
          label: 'On Time',
          className: 'bg-green-700/20 text-green-500 border-green-600/30',
        };
      case 'absent':
        return {
          label: 'Absent',
          className: 'bg-red-700/20 text-red-500 border-red-600/30',
        };
      case 'late':
        return {
          label: 'Late',
          className: 'bg-yellow-700/20 text-yellow-500 border-yellow-600/30',
        };
      default:
        return {
          label: 'Unknown',
          className: 'bg-gray-700/20 text-gray-500 border-gray-600/30',
        };
    }
  };

  const { label, className } = getStatusDetails(status);

  return (
    <Badge
      variant='outline'
      className={`px-2 py-1 text-xs font-medium ${className}`}
    >
      {label}
    </Badge>
  );
};

export default AttendanceStatusBadge;
