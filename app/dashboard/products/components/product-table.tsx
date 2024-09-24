'use client';

import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Product } from '../../types/product';
import InventoryStatusBadge from './inventory-status-badge';
import EmptyProductTable from './empty-product-table';

interface Props {
  products: Product[];
}

export default function ProductTable({ products }: Props) {
  if (products.length === 0) {
    return <EmptyProductTable />;
  }

  return (
    <Card className='shadow-none bg-white border-[0.1px] rounded-xl'>
      <CardHeader>
        <div className='flex justify-between items-center'>
          <div>
            <CardTitle>Products</CardTitle>
            <CardDescription>
              Manage your products and view their sales performance.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>

              <TableHead className='hidden md:table-cell'>Category</TableHead>
              <TableHead className='hidden md:table-cell'>
                Total Sales
              </TableHead>
              <TableHead>
                <span className='sr-only'>Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className='cursor-pointer font-normal'>
                <TableCell className='text-sm'>{product.name}</TableCell>
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

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup='true' size='icon' variant='ghost'>
                        <MoreHorizontal className='h-4 w-4' />
                        <span className='sr-only'>Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>
                        {/* <DeleteProductDialog /> */}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className='text-xs text-muted-foreground'>
          Showing <strong>1-{products.length}</strong> of{' '}
          <strong>{products.length}</strong> products
        </div>
      </CardFooter>
    </Card>
  );
}
