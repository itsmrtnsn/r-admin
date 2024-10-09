'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import useQueryParameter from '@/app/hooks/use-query-parameter';

export function DatePicker() {
  const [date, setDate] = React.useState<Date>(new Date());
  const { handleQuery } = useQueryParameter('date');

  const handleDate = () => {
    handleQuery(date?.toLocaleDateString());
  };

  return (
    <div className='flex items-center gap-2'>
      <Popover>
        <PopoverTrigger asChild>
          <div className='flex items-center gap-2'>
            <Button
              variant={'outline'}
              className={cn(
                'w-[200px] justify-start text-left font-normal h-10 shadow-none border-[0.1px] bg-[#0a0a0a]',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className='mr-2 h-4 w-4' />
              {date ? format(date, 'PPP') : <span>Choisir une date</span>}
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
          <Calendar
            mode='single'
            selected={date}
            onSelect={(selectedDate: Date | undefined) =>
              selectedDate && setDate(selectedDate)
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Button disabled={!date} className='font-normal' onClick={handleDate}>
        Sumettre
      </Button>
    </div>
  );
}
