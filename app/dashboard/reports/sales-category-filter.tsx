'use client';

import useQueryParameter from '@/app/hooks/use-query-parameter';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SaleCategory } from '@prisma/client';
import { SalesCategories } from './sales-category';

const SalesCategoryFilter = () => {
  const { handleQuery } = useQueryParameter('category');
  return (
    <Select onValueChange={(value) => handleQuery(value)}>
      <SelectTrigger className='w-fit px-2 shadow-none border-[0.1px]'>
        <SelectValue placeholder='Sélectionnez une catégorie' />
      </SelectTrigger>
      <SelectContent>
        {SalesCategories.map((category) => (
          <SelectItem value={category.value}>{category.name}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SalesCategoryFilter;
