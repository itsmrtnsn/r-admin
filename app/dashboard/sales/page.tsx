import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SalesTable } from './sales-table';

const SalesPage = () => {
  return (
    <section className='flex flex-col gap-8'>
      <div className='grid grid-cols-4 gap-4'>
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className='bg-slate-900'>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <SalesTable />
    </section>
  );
};

export default SalesPage;
