'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import Pagination from '@/components/pagination';
import { Product } from '@prisma/client';
import InventoryStatusBadge from './inventory-status-badge';
import { Checkbox } from '@/components/ui/checkbox';

interface Props {
  products: (Product & { category: { name: string }; quantitySold: number })[];
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

const tableHeads = [
  'Item',
  'Prix',
  'Categorie',
  'Total Vente',
  'Statut',
  'Action',
];

export default function ProductTable({
  products,
  totalPages,
  currentPage,
  itemsPerPage,
}: Props) {
  return (
    <Card className='shadow-none bg-white border-[0.1px] rounded-xl'>
      <CardHeader>
        <div className='flex justify-between items-center'>
          <div>
            <CardTitle>Produits</CardTitle>
            <CardDescription>
              Gérez vos produits et visualisez leurs performances de vente.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
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
              <TableRow
                key={product.id}
                className='cursor-pointer text-sm text-slate-900'
              >
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell className='py-3.5'>{product.name}</TableCell>

                <TableCell className=''>{product.price}</TableCell>

                <TableCell className=''>{product.category.name}</TableCell>
                <TableCell className=''>{product.quantitySold}</TableCell>
                <TableCell>
                  <InventoryStatusBadge
                    status={product.status}
                    quantityInStock={product.quantityInStock}
                    threshold={product.threshold}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className='w-full'>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
      </CardFooter>
    </Card>
  );
}
