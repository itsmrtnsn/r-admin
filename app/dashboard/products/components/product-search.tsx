'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ProductSearch() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className='relative w-full max-w-sm'>
      <div
        className={`
          absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none
          transition-opacity duration-300 ease-in-out
          ${isFocused ? 'opacity-100' : 'opacity-50'}
        `}
      >
        <Search className='w-5 h-5 text-gray-400' />
      </div>
      <Input
        type='search'
        placeholder='Search...'
        className={cn(
          'pl-10 pr-4 py-2 w-full border-[0.1px] rounded-full bg-slate-50 border-slate-200 transition-all duration-300 ease-in-out focus:outline-none shadow-none',
          {
            'bg-white ': isFocused,
          }
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <div
        className={`
          absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary
          transition-all duration-300 ease-in-out
          ${isFocused ? 'w-full left-0' : ''}
        `}
      />
    </div>
  );
}
