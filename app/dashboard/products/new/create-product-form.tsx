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
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import cretaeProduct from '../../_actions/create-product';
import createProductFormSchema from '../../_schema/create-product-form-schema';
import CreateProductFormData from '../../_types/create-product-form-data';
import { productStatusOptionList } from '../../_types/product-status-option';

interface Props {
  categories: { name: string; slug: string; id: string }[];
}

export default function CreateProductForm({ categories }: Props) {
  const router = useRouter();
  const [serverErrors, setServerErrors] = useState<
    Partial<Record<keyof CreateProductFormData, string[]>>
  >({});

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductFormSchema),
  });

  const onSubmit = async (data: CreateProductFormData) => {
    const result = await cretaeProduct(data);

    if (result.success) {
      toast.success('Employé créé avec succès');
      router.push('/dashboard/products');
      reset();
    }

    if (result.errors) {
      toast.error(result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-2'>
          <Label htmlFor='name'>Nom de l'article</Label>
          <Input
            id='name'
            {...register('name')}
            placeholder={`Nom de l'article`}
            className='bg-black/50'
          />
          {errors.name && (
            <p className='text-red-600 text-xs animate-pulse'>
              {errors.name.message}
            </p>
          )}
          {serverErrors.name && (
            <p className='text-red-600 text-xs animate-pulse'>
              {serverErrors.name[0]}
            </p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='category'>Catégorie</Label>
          <Controller
            name='category'
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className='bg-black/50'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem value={category.id} key={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.category && (
            <p className='text-red-600 text-xs animate-pulse'>
              {errors.category.message}
            </p>
          )}
          {serverErrors.category && (
            <p className='text-red-600 text-xs animate-pulse'>
              {serverErrors.category[0]}
            </p>
          )}
        </div>
        <div className='space-y-2'>
          <Label htmlFor='price'>Prix</Label>
          <Input
            id='price'
            type='number'
            step='0.01'
            className='bg-black/50'
            {...register('price', { valueAsNumber: true })}
            placeholder='0.00'
          />
          {errors.price && (
            <p className='text-red-600 text-xs animate-pulse'>
              {errors.price.message}
            </p>
          )}
          {serverErrors.price && (
            <p className='text-red-600 text-xs animate-pulse'>
              {serverErrors.price[0]}
            </p>
          )}
        </div>
        <div className='space-y-2'>
          <Label htmlFor='quantity'>Quantité</Label>
          <Input
            id='quantity'
            type='number'
            {...register('quantity', { valueAsNumber: true })}
            placeholder='0'
            className='bg-black/50'
          />
          {errors.quantity && (
            <p className='text-red-600 text-xs animate-pulse'>
              {errors.quantity.message}
            </p>
          )}
          {serverErrors.quantity && (
            <p className='text-red-600 text-xs animate-pulse'>
              {serverErrors.quantity[0]}
            </p>
          )}
        </div>
        <div className='space-y-2'>
          <Label htmlFor='threshold'>Seuil</Label>
          <Input
            id='threshold'
            type='number'
            {...register('threshold', { valueAsNumber: true })}
            placeholder='1'
            className='bg-black/50'
          />
          {errors.threshold && (
            <p className='text-red-600 text-xs animate-pulse'>
              {errors.threshold.message}
            </p>
          )}
          {serverErrors.quantity && (
            <p className='text-red-600 text-xs animate-pulse'>
              {serverErrors.quantity[0]}
            </p>
          )}
        </div>
        <div className='space-y-2'>
          <Label htmlFor='category'>Statut</Label>
          <Controller
            name='status'
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className='bg-black/50'>
                  <SelectValue placeholder='Sélectionnez un statut' />
                </SelectTrigger>
                <SelectContent>
                  {productStatusOptionList.map((status) => (
                    <SelectItem value={status}>
                      {status === 'active' && 'Actif'}
                      {status === 'archived' && 'Archivé'}
                      {status === 'draft' && 'Brouillon'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.status && (
            <p className='text-red-600 text-xs animate-pulse'>
              {errors.status.message}
            </p>
          )}
          {serverErrors.status && (
            <p className='text-red-600 text-xs animate-pulse'>
              {serverErrors.status[0]}
            </p>
          )}
        </div>
        <div className='space-y-2'>
          <Label htmlFor='expirationDate'>Date d'expiration</Label>
          <Input
            id='expirationDate'
            {...register('expirationDate')}
            placeholder={`Date d'expiration`}
            type='date'
            className='bg-black/50'
          />
          {errors.expirationDate && (
            <p className='text-red-600 text-xs animate-pulse'>
              {errors.expirationDate.message}
            </p>
          )}
          {serverErrors.expirationDate && (
            <p className='text-red-600 text-xs animate-pulse'>
              {serverErrors.expirationDate[0]}
            </p>
          )}
        </div>
      </div>
      <div className='flex justify-end'>
        <Button
          type='submit'
          variant='outline'
          className='bg-blue-700 text-white hover:bg-blue-800 transition-colors ease-linear duration-300 font-normal'
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader size={17} className='animate-spin' />
              <span className='ml-2'>Enregistrement...</span>
            </>
          ) : (
            <span>Enregistrer l'article</span>
          )}
        </Button>
      </div>
    </form>
  );
}
