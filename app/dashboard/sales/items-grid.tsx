import { Card, CardContent } from '@/components/ui/card';
import ProductCard from './product-card';

const products: {
  id: string;
  name: string;
  price: number;
  category: string;
}[] = [
  { id: '1', name: 'Craft Lager', price: 5.0, category: 'Beer' },
  { id: '2', name: 'Signature Margarita', price: 8.0, category: 'Cocktails' },
  { id: '3', name: 'Botanical Gin Fizz', price: 7.5, category: 'Cocktails' },
  { id: '4', name: 'Single Malt Whiskey', price: 9.0, category: 'Spirits' },
  { id: '5', name: 'Pinot Noir', price: 7.0, category: 'Wine' },
  { id: '6', name: 'Chardonnay', price: 7.0, category: 'Wine' },
  { id: '7', name: 'Moscow Mule', price: 6.5, category: 'Cocktails' },
  { id: '8', name: 'Cuba Libre', price: 6.5, category: 'Cocktails' },
  { id: '9', name: 'IPA', price: 4.5, category: 'Beer' },
  { id: '10', name: 'Tequila Shot', price: 5.0, category: 'Spirits' },
  { id: '11', name: 'Classic Mojito', price: 8.5, category: 'Cocktails' },
  { id: '12', name: 'Espresso Martini', price: 10.0, category: 'Cocktails' },
];

const ItemsGrid = () => {
  return (
    <Card className='overflow-y-auto shadow-none border-[0.1px] border-slate-200 dark:border-slate-700 h-[calc(83vh-64px)] pt-4'>
      <CardContent>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemsGrid;
