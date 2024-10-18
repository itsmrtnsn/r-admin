import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ellipsis } from 'lucide-react';
import Link from 'next/link';

const TableAction = ({ productId }: { productId: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon' variant='ghost'>
          <Ellipsis className='cursor-pointer text-muted-foreground' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Passez à l'action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/dashboard/products/${productId}`}>Aperçu</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`/dashboard/products/${productId}/edit`}>Modifier</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableAction;
