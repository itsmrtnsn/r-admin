import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ProductStatus } from '@prisma/client';

interface Props {
  status: ProductStatus;
  quantityInStock: number;
  threshold: number;
}

export default function InventoryStatusBadge({
  status,
  quantityInStock,
  threshold,
}: Props) {
  const getInventoryStatus = () => {
    if (status === 'draft') return 'draft';
    if (status === 'archived') return 'archived';
    if (quantityInStock === 0) return 'out_of_stock';
    if (quantityInStock < threshold) return 'low_stock';
    return 'stock_ok';
  };

  const inventoryStatus = getInventoryStatus();

  return (
    <Badge
      variant='outline'
      className={cn('shadow-none rounded-sm ', {
        'bg-gray-100/20 text-gray-600 border-gray-300':
          inventoryStatus === 'archived',
        'bg-yellow-100 text-yellow-600 border-yellow-300':
          inventoryStatus === 'draft',
        'bg-red-100 text-red-600 border-red-300':
          inventoryStatus === 'out_of_stock',
        'bg-green-100 text-green-600 border-green-300':
          inventoryStatus === 'stock_ok',
        'bg-blue-50 text-blue-600 border-blue-300':
          inventoryStatus === 'low_stock',
      })}
    >
      {inventoryStatus === 'draft' && 'Brouillon'}
      {inventoryStatus === 'archived' && 'Archivé'}
      {inventoryStatus === 'out_of_stock' && 'Rupture de stock'}
      {inventoryStatus === 'stock_ok' && 'En stock'}
      {inventoryStatus === 'low_stock' && 'Stock faible'}
    </Badge>
  );
}
