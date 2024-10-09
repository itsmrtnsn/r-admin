'use client';

import { CalendarIcon } from '@radix-ui/react-icons';
import { addDays, format } from 'date-fns';
import * as React from 'react';
import { DateRange } from 'react-day-picker';

import useQueryParameter from '@/app/hooks/use-query-parameter';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export function DateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const today = new Date();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(today, -15),
    to: today,
  });

  const { handleQuery } = useQueryParameter('date_range');

  const handleDate = () => {
    if (date?.from && date?.to) {
      // Only call the query update functions if both from and to dates are set
      handleQuery(
        format(date.from, 'yyyy-MM-dd') + 'x' + format(date.to, 'yyyy-MM-dd')
      );
    }
  };

  return (
    <div className={cn('flex gap-2 items-center', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              'w-[250px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      <Button
        size='sm'
        type='submit'
        className='font-normal'
        onClick={() => {
          handleDate();
        }}
      >
        Submit
      </Button>
    </div>
  );
}
