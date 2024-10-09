'use client';

import useQueryParameter from '@/app/hooks/use-query-parameter';
import { Input } from './ui/input';
import { Search as SearchIcon } from 'lucide-react';

const Search = () => {
  const { query, handleQuery } = useQueryParameter('search');
  return (
    <div className='relative w-full md:w-auto'>
      <SearchIcon className='absolute left-2 top-3 h-4 w-4 text-muted-foreground' />
      <Input
        type='text'
        placeholder='Rechercher un employé...'
        // value={query || ''}
        onChange={(e) => handleQuery(e.target.value)}
        className='pl-8 w-full md:w-[350px] h-10 shadow-none border-[0.1px] bg-black'
      />
    </div>
  );
};

export default Search;
