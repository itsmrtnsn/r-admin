'use client';

import { useState } from 'react';
import { addDays, format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
// import { toast } from '@/components/ui/use-toast';

export function DateRangeFilter({ className }: { className?: string }) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [formattedRange, setFormattedRange] = useState<string>('');

  const handleApply = () => {
    if (date?.from && date?.to) {
      const formattedFrom = format(date.from, 'yyyy-MM-dd');
      const formattedTo = format(date.to, 'yyyy-MM-dd');
      const range = `${formattedFrom} to ${formattedTo}`;
      setFormattedRange(range);
      // toast({
      //   title: 'Date Range Applied',
      //   description: `Selected range: ${range}`,
      // });
      console.log('Formatted date range for database query:', range);
    } else {
      // toast({
      //   title: 'Invalid Date Range',
      //   description: 'Please select both start and end dates.',
      //   variant: 'destructive',
      // });
    }
  };

  return (
    // <div>
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id='date'
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            'border-gray-300 hover:bg-gray-100 transition-colors duration-200'
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4 text-gray-500' />
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
            <span>Pick a date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='w-auto p-0 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'
        align='start'
      >
        <div className='p-4 bg-white rounded-lg shadow-lg'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            className='rounded-md border'
          />
          <div className='mt-4 flex justify-end space-x-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => {
                setDate(undefined);
                setFormattedRange('');
              }}
              className='text-sm'
            >
              Clear
            </Button>
            <Button
              size='sm'
              onClick={handleApply}
              className='text-sm bg-primary text-primary-foreground hover:bg-primary/90'
            >
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
