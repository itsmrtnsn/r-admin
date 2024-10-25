'use client';

import { Group, Input, Label, TextField } from 'react-aria-components';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function TextInput({ label, ...inputProps }: Props) {
  return (
    <TextField defaultValue={''} className='font-normal'>
      <div className='space-y-2'>
        <Label className='text-sm  text-foreground'>{label}</Label>
        <Group className='relative inline-flex  w-full items-center overflow-hidden whitespace-nowrap rounded-lg border border-gray-300 border-input text-sm shadow-none ring-offset-background transition-shadow data-[focus-within]:border-ring data-[disabled]:opacity-50 data-[focus-within]:outline-none data-[focus-within]:ring-2 data-[focus-within]:ring-ring/30 data-[focus-within]:ring-offset-2 h-10'>
          <Input
            className='flex-1 bg-background px-3 py-2 tabular-nums text-foreground focus:outline-none shadow-none '
            {...inputProps}
          />
        </Group>
      </div>
    </TextField>
  );
}
