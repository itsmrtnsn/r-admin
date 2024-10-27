'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
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
import { getCustomers } from '../_actions/get-customers';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Customer } from '@prisma/client';
import useQueryParameter from '@/app/hooks/use-query-parameter';
import { Input } from '@/components/ui/input';

interface Props {
  onSelect: () => void;
}

export function CustomerCombobox() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const { handleQuery, query } = useQueryParameter('customer');
  const [selectedCustomerId, setSelectedCustomerId] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    const fetchCustomers = async () => {
      const { customers } = await getCustomers(query ? query : undefined);
      setCustomers(customers);
    };
    fetchCustomers();
  }, [query]);

  const selectedCustomer = customers.find(
    (customer) => customer.id === selectedCustomerId
  );

  const defaultValue =
    query !== undefined
      ? query
      : `${selectedCustomer?.firstName} ${selectedCustomer?.lastName}`;

  return (
    <Popover open={open}>
      <PopoverTrigger
        asChild
        className='shadow-none border-slate-300 border-[0.1px] h-10'
      >
        <Button
          variant='outline'
          role='combobox'
          className='w-full justify-between font-normal'
          onClick={() => setOpen(!open)}
        >
          {selectedCustomer
            ? `${selectedCustomer.firstName} ${selectedCustomer.lastName}`
            : 'Liste des clients'}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[440px] p-0 shadow-none border-[0.1px] border-slate-300'>
        <Command>
          <div className='m-2'>
            <Input
              defaultValue={defaultValue ? defaultValue : ''}
              placeholder='Search employees...'
              className='border-[0.1px] border-slate-300 h-10 shadow-none ring-0 outline-none focus-visible:outline-none focus:border-none focus-visible:ring-slate-400'
              onChange={(value) => handleQuery(value.currentTarget.value)}
            />
          </div>
          <CommandList className='border-[0.1px] mx-2 mb-2 rounded-lg border-slate-300'>
            <CommandEmpty>Aucun client trouvé.</CommandEmpty>
            <CommandGroup>
              {customers.length > 0 &&
                customers.map((customer) => (
                  <CommandItem
                    key={customer.id}
                    value={customer.id}
                    onSelect={(currentValue) => {
                      setOpen(false);
                      setSelectedCustomerId(currentValue);
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        selectedCustomerId === customer.id
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                    {customer.firstName} {customer.lastName}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
