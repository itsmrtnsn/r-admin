'use client';

import useQueryParameter from '@/app/hooks/use-query-parameter';
import { Input } from './ui/input';
import { Search as SearchIcon } from 'lucide-react';

const Search = () => {
  const { query, handleQuery } = useQueryParameter('search');
  return (
    <div className='relative w-full md:w-auto'>
      <SearchIcon className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
      <Input
        type='text'
        placeholder='Rechercher un employé...'
        // value={query || ''}
        onChange={(e) => handleQuery(e.target.value)}
        className='pl-7 w-full text-sm md:w-[350px]   shadow-none border-[0.1px] border-zinc-700 bg-black focus:border-none focus-visible:outline-dashed foucus-visible:outline-blue-600'
      />
    </div>
  );
};

export default Search;
