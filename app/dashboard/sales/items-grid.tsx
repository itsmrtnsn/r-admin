import { Card, CardContent } from '@/components/ui/card';
import ProductCard from './product-card';

const products: {
  id: string;
  name: string;
  price: number;
  category: string;
}[] = [
  { id: '1', name: 'Jumex', price: 1500, category: 'Beer' },
  { id: '2', name: 'Prestige', price: 2500, category: 'Cocktails' },
  { id: '3', name: 'Pat n Toes', price: 300, category: 'Cocktails' },
  { id: '4', name: 'Gatorade', price: 175, category: 'Spirits' },
  { id: '5', name: 'Guiness', price: 100, category: 'Wine' },
  { id: '6', name: 'Jus Petit', price: 100, category: 'Wine' },
  { id: '7', name: 'Moscow Mule', price: 100, category: 'Cocktails' },
  { id: '8', name: 'Cuba Libre', price: 125, category: 'Cocktails' },
  { id: '9', name: 'IPA', price: 4.5, category: 'Beer' },
  { id: '10', name: 'Tequila Shot', price: 75, category: 'Spirits' },
  { id: '11', name: 'Classic Mojito', price: 100, category: 'Cocktails' },
  { id: '12', name: 'Espresso Martini', price: 1758, category: 'Cocktails' },
  { id: '12', name: 'Espresso Martini', price: 1758, category: 'Cocktails' },
  { id: '12', name: 'Espresso Martini', price: 1758, category: 'Cocktails' },
];

const ItemsGrid = () => {
  return (
    <div className=''>
      <div className='grid grid-cols-1 sm:grid-cols-2 p-0 lg:grid-cols-3 gap-4'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ItemsGrid;
