import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AttendanceCheckOutStatus } from '@prisma/client';

interface Props {
  status: AttendanceCheckOutStatus;
}

const CheckOutStatusBadge = ({ status }: Props) => {
  return (
    <Badge
      variant='outline'
      className={cn('px-2 py-1 text-xs font-medium border-[0.1px]', {
        'bg-green-700/20 text-green-500 border-green-600/30':
          status === 'on_time',
        'bg-red-700/20 text-red-500 border-red-600/30': status === 'early',
      })}
    >
      {status === 'on_time' && "À l'heure"}
      {status === 'early' && 'Tôt'}
    </Badge>
  );
};

export default CheckOutStatusBadge;
