'use client';

import useQueryParameter from '@/app/hooks/use-query-parameter';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function ProductSearch() {
  const [isFocused, setIsFocused] = useState(false);
  const { handleQuery } = useQueryParameter('product_search');

  return (
    <div className='relative w-full max-w-sm'>
      <div
        className={`
          absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none
          transition-opacity duration-300 ease-in-out
          ${isFocused ? 'opacity-100' : 'opacity-50'}
        `}
      >
        <Search className='w-5 h-5 text-muted-foreground' />
      </div>
      <Input
        onChange={(value) => handleQuery(value.target.value)}
        type='search'
        placeholder='Search...'
        className={cn(
          'pl-10 pr-4 py-2 w-full border-[0.1px] rounded-full transition-all duration-300 ease-in-out focus:outline-none shadow-none'
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
}
