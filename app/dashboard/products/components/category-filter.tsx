'use client';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import useQueryParameter from '@/app/hooks/use-query-parameter';

const TAB_TRIGGERS: (
  | 'all'
  | 'out_of_stock'
  | 'low_stock'
  | 'stock_ok'
  | 'draft'
  | 'archived'
)[] = ['all', 'draft', 'archived', 'out_of_stock', 'low_stock', 'stock_ok'];
const statuses: Record<
  'all' | 'out_of_stock' | 'low_stock' | 'stock_ok' | 'draft' | 'archived',
  string
> = {
  all: 'Tous',
  draft: 'Brouillon',
  archived: 'Archivé',
  out_of_stock: 'Rupture de stock',
  low_stock: 'Stock faible',
  stock_ok: 'En stock',
};

interface CustomPopoverProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
}

const CustomPopover = ({ children, trigger }: CustomPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className='shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] w-full'>
        <div className='w-[30rem] p-1'>{children}</div>
      </PopoverContent>
    </Popover>
  );
};

export const CategoryFilter = () => {
  const { query, handleQuery } = useQueryParameter('product_status');
  const queryStatus = query ? query : 'all';
  return (
    <CustomPopover
      trigger={
        <Button variant='outline' className='text-sm font-normal'>
          Filter By Status
        </Button>
      }
    >
      <div className='flex border-[0.1px] border-slate-300  gap-4 bg-slate-5000 px-2 py-3 rounded-lg flex-wrap bg-white  '>
        {TAB_TRIGGERS.map((status) => (
          <Button
            variant='outline'
            key={status}
            onClick={() => handleQuery(status)}
            className={cn(
              'border-[0.1px] text-sm font-normal  hover:text-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] ',
              {
                'bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5] text-white':
                  queryStatus === status,
              }
            )}
          >
            {statuses[status]}
          </Button>
        ))}
      </div>
    </CustomPopover>
  );
};
