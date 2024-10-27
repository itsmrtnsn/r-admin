import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SaleCategory } from '@prisma/client';
import { SalesCategories } from './sales-category';

const saleTableHeader = [
  'Transaction ID',
  'Cashier',
  'Date',
  'Amount',
  'Category',
];
type Sale = {
  id: string;
  reference: string;
  cashier: string;
  createdAt: Date;
  total: number;
  category: SaleCategory;
};
interface Props {
  sales: Sale[];
  totalRevenue: number;
}

const SalesTable = ({ sales, totalRevenue }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {saleTableHeader.map((header) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sales.map((sale) => (
          <TableRow key={sale.id} className='h-12'>
            <TableCell>{sale.reference}</TableCell>
            <TableCell>{sale.cashier}</TableCell>
            <TableCell>{sale.createdAt.toLocaleDateString()}</TableCell>
            <TableCell>{sale.total}</TableCell>
            <TableCell>
              {
                SalesCategories.find(
                  (category) => category.value === sale.category
                )?.name
              }
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell></TableCell>
          <TableCell
            colSpan={2}
            className='font-semibold text-base text-primary'
          >
            Total
          </TableCell>
          <TableCell className='font-semibold text-base text-primary'>
            ${totalRevenue.toFixed(2)}
          </TableCell>
          <TableCell colSpan={2}></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default SalesTable;
