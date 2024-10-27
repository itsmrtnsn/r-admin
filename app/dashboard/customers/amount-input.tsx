'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  Button,
  Group,
  Input,
  Label,
  NumberField,
  NumberFieldProps,
} from 'react-aria-components';

interface AmountInputProps extends Omit<NumberFieldProps, 'children'> {
  label?: string;
}

export default function AmountInput({
  label = 'Montant reçu',
  ...props
}: AmountInputProps) {
  return (
    <NumberField
      defaultValue={0.0}
      formatOptions={{
        style: 'currency',
        currency: 'HTG',
        currencySign: 'accounting',
      }}
      {...props}
    >
      <div className='space-y-2'>
        <Label className='text-sm font-medium text-foreground'>{label}</Label>
        <Group className='relative inline-flex  w-full items-center overflow-hidden whitespace-nowrap rounded-lg border-[0.1px] border-slate-300 border-input text-sm shadow-none ring-offset-background transition-shadow data-[focus-within]:border-ring data-[disabled]:opacity-50 data-[focus-within]:outline-none data-[focus-within]:ring-2 data-[focus-within]:ring-ring/30 data-[focus-within]:ring-offset-2 h-10'>
          <Input className='flex-1 bg-background px-3 py-2 tabular-nums text-foreground focus:outline-none shadow-none ' />
          <div className='flex h-[calc(100%+2px)] flex-col'>
            <Button
              slot='increment'
              className='-me-px flex h-1/2 w-6 flex-1 items-center justify-center border border-input bg-background text-sm text-muted-foreground/80 ring-offset-background transition-shadow hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
            >
              <ChevronUp size={12} strokeWidth={2} aria-hidden='true' />
            </Button>
            <Button
              slot='decrement'
              className='-me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border border-input bg-background text-sm text-muted-foreground/80 ring-offset-background transition-shadow hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
            >
              <ChevronDown size={12} strokeWidth={2} aria-hidden='true' />
            </Button>
          </div>
        </Group>
      </div>
    </NumberField>
  );
}
