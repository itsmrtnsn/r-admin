'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileText, LoaderCircle, Mail, Phone, User } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import identificationCardOtions from '../_libs/Identification-option';
import createCustomerSchema from '../_schema/create-client-form-schema';
import { CreateCustomerFormData } from '../_types/create-client-form-data';
import { createCustomer } from '../_actions/create-customer';
import { useRouter } from 'next/navigation';

interface Props {
  onCancel: () => void;
  onSuccess: () => void;
}

export default function NewCustomerForm({ onCancel, onSuccess }: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm<CreateCustomerFormData>({
    resolver: zodResolver(createCustomerSchema),
  });

  const onSubmit = async (data: CreateCustomerFormData) => {
    const result = await createCustomer(data);

    if (result.success) {
      toast.success('Le nouveau produit a été créé avec succès');
      router.refresh();
      reset();
      onSuccess();
    }

    if (result.errors) {
      toast.error(result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label htmlFor='firstName' className='text-sm font-normal'>
            Prénom
          </Label>
          <div className='relative'>
            <Input
              id='firstName'
              placeholder='Prénom'
              {...register('firstName')}
              className={cn(
                'pl-10 pr-4 border-[0.1px] py-2 w-full border-slate-300 focus:border-primary/20 focus:ring-1 outline-none focus-visible:outline-dashed focus:ring-blue-400 rounded-lg transition-all duration-300 ease-in-out shadow-none'
              )}
            />
            <User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
          </div>
          {errors.firstName && (
            <p className='mt-1 text-xs text-destructive'>
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div className='space-y-2'>
          <Label htmlFor='lastName' className='text-sm font-normal'>
            Nom de famille
          </Label>
          <div className='relative'>
            <Input
              id='lastName'
              placeholder='Nom de famille'
              {...register('lastName')}
              className={cn(
                'pl-10 pr-4 border-[0.1px] py-2 w-full border-slate-300 focus:border-primary/20 focus:ring-1 outline-none focus-visible:outline-dashed focus:ring-blue-400 rounded-lg transition-all duration-300 ease-in-out shadow-none'
              )}
            />
            <User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
          </div>
          {errors.lastName && (
            <p className='mt-1 text-xs text-destructive'>
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label htmlFor='phone' className='text-sm font-normal'>
            Numéro de téléphone
          </Label>
          <div className='relative'>
            <Input
              id='phone'
              type='tel'
              placeholder='Enter phone number'
              {...register('phoneNumber')}
              className={cn(
                'pl-10 pr-4 border-[0.1px] py-2 w-full border-slate-300 focus:border-primary/20 focus:ring-1 outline-none focus-visible:outline-dashed focus:ring-blue-400 rounded-lg transition-all duration-300 ease-in-out shadow-none'
              )}
            />
            <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
          </div>
          {errors.phoneNumber && (
            <p className='mt-1 text-xs text-destructive'>
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
        <div className='space-y-2'>
          <Label htmlFor='email' className='text-sm font-normal'>
            Email
          </Label>
          <div className='relative'>
            <Input
              id='email'
              type='email'
              placeholder='Email'
              {...register('email')}
              className={cn(
                'pl-10 pr-4 border-[0.1px] py-2 w-full border-slate-300 focus:border-primary/20 focus:ring-1 outline-none focus-visible:outline-dashed focus:ring-blue-400 rounded-lg transition-all duration-300 ease-in-out shadow-none'
              )}
            />
            <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
          </div>
          {errors.email && (
            <p className='mt-1 text-xs text-destructive'>
              {errors.email.message}
            </p>
          )}
        </div>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label htmlFor='select' className='text-sm font-normal'>
            Sélectionner
          </Label>

          <Controller
            name='idType'
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className='border-[0.1px]   shadow-none   p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-200'>
                  <SelectValue placeholder={`Type de pièce d'identité`} />
                </SelectTrigger>
                <SelectContent>
                  {identificationCardOtions.map((option) => (
                    <SelectItem value={option.value}>{option.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.idType && (
            <p className='mt-1 text-xs text-destructive'>
              {errors.idType.message}
            </p>
          )}
        </div>
        <div className='space-y-2'>
          <Label htmlFor='idNumber' className='text-sm font-normal'>
            Numéro d'identification
          </Label>
          <div className='relative'>
            <Input
              id='idNumber'
              placeholder="Numéro d'identification"
              {...register('idNumber')}
              className={cn(
                'pl-10 pr-4 border-[0.1px] py-2 w-full border-slate-300 focus:border-primary/20 focus:ring-1 outline-none focus-visible:outline-dashed focus:ring-blue-400 rounded-lg transition-all duration-300 ease-in-out shadow-none'
              )}
            />
            <FileText className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
          </div>
          {errors.idNumber && (
            <p className='mt-1 text-xs text-destructive'>
              {errors.idNumber.message}
            </p>
          )}
        </div>
      </div>
      <div className='flex justify-end space-x-4 mt-6'>
        <Button
          type='button'
          variant='outline'
          className='px-6 py-2  shadow-none border-[0.1px] border-gray-300  hover:bg-gray-100 border-primary text-primary transition-all duration-300 ease-in-out font-normal'
          onClick={onCancel}
        >
          Annuler
        </Button>
        <Button
          type='submit'
          variant={'default'}
          className='px-6 py-2 font-normal  text-white  hover:shadow-lg transition-all duration-300 ease-in-out '
        >
          {isSubmitting && (
            <LoaderCircle className='animate-spin w-4 h-4 text-white mr-2' />
          )}
          Créer
        </Button>
      </div>
    </form>
  );
}
