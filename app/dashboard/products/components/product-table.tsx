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
import { Product } from '../../types/product';
import EmptyProductTable from './empty-product-table';
import InventoryStatusBadge from './inventory-status-badge';
import Pagination from '@/components/pagination';

interface Props {
  products: Product[];
}

const tableHeads = ['Item', 'Status', 'Prix', 'Categorie', 'Vente Totale'];

export default function ProductTable({ products }: Props) {
  if (products.length === 0) {
    return <EmptyProductTable />;
  }

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
                  <InventoryStatusBadge status={product.status} />
                </TableCell>
                <TableCell className=''>{product.price.toFixed(2)}</TableCell>
                <TableCell className='hidden md:table-cell'>
                  {product.category}
                </TableCell>
                <TableCell className='hidden md:table-cell'>
                  {product.totalSales}
                </TableCell>

                {/* <TableCell>
                  <ProductAction />
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className='w-full'>
        <Pagination
          itemsPerPage={10}
          totalPages={10}
          currentPage={1}
          handleItemsPerPageChange={(value: string) => {
            console.log(value);
          }}
          handlePageChange={(value: number) => {
            console.log(value);
          }}
        />
      </CardFooter>
    </Card>
  );
}
