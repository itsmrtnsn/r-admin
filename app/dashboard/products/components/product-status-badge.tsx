import { Badge } from '@/components/ui/badge';
import React from 'react';

import { cn } from '@/lib/utils';
import { ProductStatus } from '@prisma/client';

interface Props {
  status: ProductStatus;
}

const ProductStatusBadge = ({ status }: Props) => {
  const statusText: Record<ProductStatus, string> = {
    active: 'Actif',
    draft: 'Brouillon',
    archived: 'Archivé',
  };
  return (
    <Badge
      variant='outline'
      className={cn('rounded-md border-[0.1px] font-normal', {
        'bg-green-50 text-green-500 border-green-200': status === 'active',
        'bg-yellow-50 text-yellow-500 border-yellow-200': status === 'draft',
        'bg-red-50 text-red-500 border-red-300': status === 'archived',
      })}
    >
      {statusText[status]}
    </Badge>
  );
};

export default ProductStatusBadge;
