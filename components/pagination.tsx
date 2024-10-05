'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import useQueryParameter from '@/app/hooks/use-query-parameter';

interface Props {
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

const Pagination = ({ totalPages, currentPage, itemsPerPage }: Props) => {
  const { handleQuery: handlePageQuery } = useQueryParameter('page');

  return (
    <div className='flex w-full flex-col sm:flex-row items-center justify-between mt-4 space-y-4 sm:space-y-0'>
      <div className='flex items-center space-x-2'>
        <p className='text-sm text-gray-500'>
          Afficher {itemsPerPage} articles par page
        </p>
      </div>

      <div className='flex items-center space-x-3'>
        <Button
          variant='outline'
          size='icon'
          className='w-8 h-8 rounded-full'
          onClick={() => handlePageQuery((currentPage - 1).toString())}
          disabled={currentPage === 1}
        >
          <ChevronLeft className='h-4 w-4' />
        </Button>
        <p className='text-sm text-gray-500'>
          Page {currentPage} of {totalPages}
        </p>
        <Button
          variant='outline'
          size='icon'
          className='w-8 h-8 rounded-full'
          disabled={currentPage === totalPages}
          onClick={() => handlePageQuery((currentPage + 1).toString())}
        >
          <ChevronRight className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
