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
      className={cn('rounded-sm', {
        'bg-green-500 text-white border-transparent': status === 'active',
        'bg-yellow-500 text-white border-transparent': status === 'draft',
        'bg-red-500 text-white border-transparent': status === 'archived',
      })}
    >
      {statusText[status]}
    </Badge>
  );
};

export default ProductStatusBadge;
