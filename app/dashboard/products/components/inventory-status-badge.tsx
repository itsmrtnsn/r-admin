import React from 'react';
import { InventoryStatus } from '../../types/product';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Props {
  status: InventoryStatus;
}

export default function InventoryStatusBadge({ status }: Props) {
  return (
    <Badge
      variant='outline'
      className={cn(
        'bg-green-100 text-green-600 border-green-300',
        {
          'bg-green-100 text-green-600 border-green-300': status === 'in_stock',
          'bg-yellow-100 text-yellow-600 border-yellow-300':
            status === 'low_stock',
          'bg-red-100 text-red-600 border-red-300': status === 'out_of_stock',
        },
        'shadow-none rounded-full font-normal'
      )}
    >
      {status === 'in_stock'
        ? 'In Stock'
        : status === 'low_stock'
        ? 'Low Stock'
        : 'Out of Stock'}
    </Badge>
  );
}
