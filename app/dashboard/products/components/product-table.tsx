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

interface Props {
  products: (Product & { category: { name: string }; quantitySold: number })[];
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

const tableHeads = ['Item', 'Statut', 'Prix', 'Categorie', 'Vente Totale'];

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
              {tableHeads.map((head) => (
                <TableHead key={head}>{head}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className='cursor-pointer font-normal'>
                <TableCell className='text-sm py-3.5'>{product.name}</TableCell>
                <TableCell>
                  <InventoryStatusBadge
                    status={product.status}
                    quantityInStock={product.quantityInStock}
                    threshold={product.threshold}
                  />
                </TableCell>
                <TableCell className=''>{product.price}</TableCell>
                <TableCell className='hidden md:table-cell'>
                  {product.category.name}
                </TableCell>
                <TableCell className='hidden md:table-cell'>
                  {product.quantitySold}
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
