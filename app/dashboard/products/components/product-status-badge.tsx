import { Badge } from '@/components/ui/badge';
import React from 'react';
import { ProductStatus } from '../../types/product';
import { cn } from '@/lib/utils';

interface Props {
  status: ProductStatus;
}

const ProductStatusBadge = ({ status }: Props) => {
  const statusText: Record<ProductStatus, string> = {
    published: 'Published',
    draft: 'Draft',
    archived: 'Archived',
  };
  return (
    <Badge
      variant='outline'
      className={cn({
        'bg-green-100 text-green-500 border-green-300': status === 'published',
        'bg-gray-100 text-gray-500 border-gray-300': status === 'draft',
        'bg-red-100 text-red-500 border-red-300': status === 'archived',
      })}
    >
      {statusText[status]}
    </Badge>
  );
};

export default ProductStatusBadge;
