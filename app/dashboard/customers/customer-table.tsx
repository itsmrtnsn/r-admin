import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Customer } from '@prisma/client';
import { EllipsisIcon } from 'lucide-react';

const tableHeaders = [
  { label: 'Identifiant', value: 'employee_id' },
  { label: 'First Name', value: 'name' },
  { label: 'Last Name', value: 'status' },
  { label: 'Gender', value: 'gender' },
  { label: 'Téléphone', value: 'phone_number' },
  { label: 'Actions', value: 'actions' },
];

interface Props {
  customers: Customer[];
}

const CustomerTable = ({ customers }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className='h-12 hover:rounded-lg'>
          <TableHead>
            <Checkbox />
          </TableHead>
          {tableHeaders.map((header) => (
            <TableHead key={header.value}>{header.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer) => (
          <TableRow key={customer.id} className='h-12 border-b-[0.1px]'>
            <TableCell className=''>
              <Checkbox />
            </TableCell>
            <TableCell className=''>{customer.idNumber}</TableCell>
            <TableCell className=''>{customer.firstName}</TableCell>
            <TableCell className=''>{customer.lastName}</TableCell>
            <TableCell className=''>{customer.Gender}</TableCell>
            <TableCell className='text-nowrap'>
              {customer.phoneNumber}
            </TableCell>

            <TableCell className=''>
              <EllipsisIcon />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CustomerTable;
