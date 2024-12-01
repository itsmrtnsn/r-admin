'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useDiscount, { discountSchema } from './hooks/use-discount';
import { z } from 'zod';
import { toast } from '@/hooks/use-toast';

type DiscountFormValues = z.infer<typeof discountSchema>;

export default function DiscountModal() {
  const [open, setOpen] = useState(false);
  const { setDiscount, resetDiscount } = useDiscount();

  const form = useForm<DiscountFormValues>({
    resolver: zodResolver(discountSchema),
    defaultValues: {
      discountType: 'PERCENTAGE',
      discountValue: 0,
      confirmationCode: '',
    },
  });

  function onSubmit(data: DiscountFormValues) {
    setDiscount(data);
    toast({
      title: 'Discount Applied',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen);
        if (!newOpen) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant='outline'>Apply Discount</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Apply Discount</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='discountType'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a discount type' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='PERCENTAGE'>Percentage</SelectItem>
                      <SelectItem value='FIXED'>Fixed Amount</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='discountValue'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Value</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmationCode'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmation Code</FormLabel>
                  <FormControl>
                    <Input type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>Apply Discount</Button>
            <Button
              type='button'
              variant='outline'
              onClick={() => {
                resetDiscount();
                form.reset();
                toast({ title: 'Discount Reset' });
              }}
            >
              Reset Discount
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
