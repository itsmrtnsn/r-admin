'use client';

import useQueryParameter from '@/app/hooks/use-query-parameter';
import { Search as SearchIcon } from 'lucide-react';
import { Input } from './ui/input';

interface Props {
  placeholder?: string;
}

const Search = ({ placeholder }: Props) => {
  const { query, handleQuery } = useQueryParameter('searchQuery');
  return (
    <div className='relative w-full md:w-auto'>
      <SearchIcon className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
      <Input
        type='text'
        placeholder={placeholder ? placeholder : 'Rechercher'}
        // value={query || ''}
        onChange={(e) => handleQuery(e.target.value)}
        className='pl-8 w-full text-sm md:w-[350px]    border-zinc-700 bg-black focus:border-none foucus-visible:outline-blue-600'
      />
    </div>
  );
};

export default Search;
