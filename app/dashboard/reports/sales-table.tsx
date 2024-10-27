import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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
  //   category: string;
};
interface Props {
  sales: Sale[];
}

const SalesTable = ({ sales }: Props) => {
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
            <TableCell>{'Drink'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SalesTable;
