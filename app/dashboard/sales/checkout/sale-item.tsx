import { ScrollArea } from '@/components/ui/scroll-area';
import { CartItem } from '../cart-store';

interface Props {
  items: CartItem[];
}
const SaleItems = ({ items }: Props) => {
  return (
    <ScrollArea className='h-[255px]'>
      {items.map((item) => (
        <div key={item.product.id} className='border-b mb-4 pb-2'>
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <p className='text-sm '>{item.product.name}</p>
              <p className='text-sm font-semibold text-primary'>
                ${item.product.price.toLocaleString()}
              </p>
            </div>
            <p className='text-xs text-muted-foreground'>
              Quantity: {item.quantity}
            </p>
          </div>
        </div>
      ))}
    </ScrollArea>
  );
};

export default SaleItems;
