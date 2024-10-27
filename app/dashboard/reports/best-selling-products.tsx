import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import topProducts from './top-products';

interface Props {
  startDate?: Date;
  endDate?: Date;
}

const tableHeaders = ['Product', 'Quantité vendue', 'Ventes totales'];

const TopSellingProducts = async ({ startDate, endDate }: Props) => {
  const products = await topProducts(startDate, endDate);

  return (
    <Card className='col-span-3 border-[0.1px] shadow-none'>
      <CardHeader>
        <CardTitle>Top 5 des produits les plus vendus</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {tableHeaders.map((header) => (
                <TableHead key={header}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className='h-12'>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.totalSales}</TableCell>
                <TableCell>${product.totalRevenue.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TopSellingProducts;
