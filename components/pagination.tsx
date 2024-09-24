'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  handleItemsPerPageChange: (value: string) => void;
  handlePageChange: (value: number) => void;
}

const Pagination = ({
  itemsPerPage,
  totalPages,
  currentPage,
  handleItemsPerPageChange,
  handlePageChange,
}: PaginationProps) => {
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
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className='w-8 h-8 rounded-full'
        >
          <ChevronLeft className='h-4 w-4' />
        </Button>
        <p className='text-sm text-gray-500'>
          Page {currentPage} of {totalPages}
        </p>
        <Button
          variant='outline'
          size='icon'
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className='w-8 h-8 rounded-full'
        >
          <ChevronRight className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
