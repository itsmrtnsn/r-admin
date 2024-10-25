import { ScrollArea } from '@/components/ui/scroll-area';

const products = [
  {
    id: 1,
    name: 'Prestige',
    price: 25000,
    quantity: 1,
    image: '/placeholder.svg?height=100&width=100',
  },
  {
    id: 2,
    name: 'Jumex',
    price: 15000,
    quantity: 1,
    image: '/placeholder.svg?height=100&width=100',
  },
];
const SaleItems = () => {
  return (
    <ScrollArea className='h-[255px]'>
      {products.map((product) => (
        <div key={product.id} className='border-b mb-4 pb-2'>
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <p className='text-sm '>{product.name}</p>
              <p className='text-sm font-semibold text-primary'>
                ${product.price.toLocaleString()}
              </p>
            </div>
            <p className='text-xs text-muted-foreground'>
              Quantity: {product.quantity}
            </p>
          </div>
        </div>
      ))}
    </ScrollArea>
  );
};

export default SaleItems;
