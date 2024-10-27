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
import { ProductType } from '../../_actions/get-products';
import ProductStatusBadge from './product-status-badge';
import TableAction from './table-action';

interface Props {
  products: ProductType[];
}

const tableHeads = [
  'Article',
  'Prix',
  'Categorie',
  'Statut',
  'Niveau de stock',
  'Action',
];

export default function ProductTable({ products }: Props) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox className='border-[0.1px] rounded-md shadow-none'></Checkbox>
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
            <TableRow key={product.id} className='cursor-pointer  h-12'>
              <TableCell>
                <Checkbox className='border-[0.1px] rounded-md shadow-none' />
              </TableCell>
              <TableCell>{product.name}</TableCell>

              <TableCell>{product.price}</TableCell>

              <TableCell>{product.category}</TableCell>
              <TableCell>
                <ProductStatusBadge status={product.status} />
              </TableCell>
              <TableCell>{product.quantityInStock}</TableCell>

              <TableCell>
                <TableAction productId={product.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
