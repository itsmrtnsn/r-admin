'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Checkbox } from '@/components/ui/checkbox';
import { Ellipsis } from 'lucide-react';
import { ProductType } from '../../_actions/get-products';
import InventoryStatusBadge from './inventory-status-badge';
import TableAction from './table-action';

interface Props {
  products: ProductType[];
}

const tableHeads = [
  'Article',
  'Prix',
  'Categorie',
  'Niveau de stock',
  'Statut',
  'Action',
];

export default function ProductTable({ products }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Checkbox></Checkbox>
          </TableHead>
          {tableHeads.map((head) => (
            <TableHead key={head} className='text-sm font-medium'>
              {head}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id} className='cursor-pointer text-sm'>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell className='py-3.5'>{product.name}</TableCell>

            <TableCell className=''>{product.price}</TableCell>

            <TableCell className=''>{product.category}</TableCell>
            <TableCell className=''>{product.quantityInStock}</TableCell>
            <TableCell>
              <InventoryStatusBadge
                status={product.status}
                quantityInStock={product.quantityInStock}
                threshold={product.threshold}
              />
            </TableCell>
            <TableCell>
              <TableAction productId={product.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
