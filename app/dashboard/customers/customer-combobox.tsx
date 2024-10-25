'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

// Sample customer data
const customers = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
  },
  {
    id: '3',
    firstName: 'Alice',
    lastName: 'Johnson',
  },
  {
    id: '4',
    firstName: 'Bob',
    lastName: 'Brown',
  },
];

export function CustomerCombobox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredCustomers = customers.filter((customer) =>
    `${customer.firstName} ${customer.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className='shadow-none border-slate-300 border-[0.1px] h-10'
      >
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full justify-between font-normal'
        >
          {value
            ? customers.find((customer) => customer.id === value)?.firstName +
              ' ' +
              customers.find((customer) => customer.id === value)?.lastName
            : 'Sélectionner un client...'}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[455px] p-0 shadow-none border-[0.1px] border-slate-300'>
        <Command>
          <CommandInput
            placeholder='Rechercher un client...'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <CommandList>
            <CommandEmpty>Aucun client trouvé.</CommandEmpty>
            <CommandGroup>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <CommandItem
                    key={customer.id}
                    value={customer.id}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === customer.id ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {customer.firstName} {customer.lastName}
                  </CommandItem>
                ))
              ) : (
                <CommandEmpty>Aucun client trouvé.</CommandEmpty>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
