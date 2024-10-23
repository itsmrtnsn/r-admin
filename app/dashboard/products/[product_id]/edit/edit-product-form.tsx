'use client';

import editProduct from '@/app/dashboard/_actions/edit-product';
import editProductFormschema from '@/app/dashboard/_schema/edit-product-form-schema';
import EditProductFormData from '@/app/dashboard/_types/edit-product-form-data';
import { productStatusOptionList } from '@/app/dashboard/_types/product-status-option';
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
import { format } from 'date-fns';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface Props {
  categories: { name: string; slug: string; id: string }[];
  initialData: EditProductFormData;
  product_id: string;
}

export default function EditProductForm({
  categories,
  initialData,
  product_id,
}: Props) {
  const router = useRouter();
  const [serverErrors, setServerErrors] = useState<
    Partial<Record<keyof EditProductFormData, string[]>>
  >({});

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EditProductFormData>({
    resolver: zodResolver(editProductFormschema),
    defaultValues: {
      name: initialData.name,
      price: initialData.price,
      threshold: initialData.threshold,
      expirationDate: format(
        new Date(initialData.expirationDate),
        'yyyy-MM-dd'
      ),
      quantityInStock: initialData.quantityInStock,
      categoryId: initialData.categoryId,
      status: initialData.status,
    },
  });

  const onSubmit = async (data: EditProductFormData) => {
    const result = await editProduct(data);

    if (result.success) {
      toast.success('Le produit est modifié avec succès');
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
        <Input value={product_id} {...register('id')} className='sr-only' />
        <div className='space-y-2'>
          <Label htmlFor='name'>Nom de l'article</Label>
          <Input
            id='name'
            {...register('name')}
            placeholder={`Nom de l'article`}
            className='bg-white shadow-none border-[0.1px]'
          />
          {errors.name && (
            <p className='text-destructive text-xs animate-pulse'>
              {errors.name.message}
            </p>
          )}
          {serverErrors.name && (
            <p className='text-destructive text-xs animate-pulse'>
              {serverErrors.name[0]}
            </p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='category'>Catégorie</Label>
          <Controller
            name='categoryId'
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className='bg-white border-[0.1px] shadow-none'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className='border-[0.1px] shadow-none'>
                  {categories?.map((categoryId) => (
                    <SelectItem value={categoryId.id} key={categoryId.id}>
                      {categoryId.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.categoryId && (
            <p className='text-destructive text-xs animate-pulse'>
              {errors.categoryId.message}
            </p>
          )}
          {serverErrors.categoryId && (
            <p className='text-destructive text-xs animate-pulse'>
              {serverErrors.categoryId[0]}
            </p>
          )}
        </div>
        <div className='space-y-2'>
          <Label htmlFor='price'>Prix</Label>
          <Input
            id='price'
            type='number'
            step='0.01'
            className='bg-white shadow-none border-[0.1px]'
            {...register('price', { valueAsNumber: true })}
            placeholder='0.00'
          />
          {errors.price && (
            <p className='text-destructive text-xs animate-pulse'>
              {errors.price.message}
            </p>
          )}
          {serverErrors.price && (
            <p className='text-destructive text-xs animate-pulse'>
              {serverErrors.price[0]}
            </p>
          )}
        </div>
        <div className='space-y-2'>
          <Label htmlFor='quantity'>Quantité</Label>
          <Input
            id='quantity'
            type='number'
            {...register('quantityInStock', { valueAsNumber: true })}
            placeholder='0'
            className='bg-white shadow-none border-[0.1px]'
          />
          {errors.quantityInStock && (
            <p className='text-destructive text-xs animate-pulse'>
              {errors.quantityInStock.message}
            </p>
          )}
          {serverErrors.quantityInStock && (
            <p className='text-destructive text-xs animate-pulse'>
              {serverErrors.quantityInStock[0]}
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
            className='bg-white shadow-none border-[0.1px]'
          />
          {errors.threshold && (
            <p className='text-destructive text-xs animate-pulse'>
              {errors.threshold.message}
            </p>
          )}
          {serverErrors.quantityInStock && (
            <p className='text-destructive text-xs animate-pulse'>
              {serverErrors.quantityInStock[0]}
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
                <SelectTrigger className='bg-white shadow-none border-[0.1px]'>
                  <SelectValue placeholder='Sélectionnez un statut' />
                </SelectTrigger>
                <SelectContent className='border-[0.1px] shadow-none'>
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
            <p className='text-destructive text-xs animate-pulse'>
              {errors.status.message}
            </p>
          )}
          {serverErrors.status && (
            <p className='text-destructive text-xs animate-pulse'>
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
            className='bg-white shadow-none border-[0.1px]'
          />
          {errors.expirationDate && (
            <p className='text-destructive text-xs animate-pulse'>
              {errors.expirationDate.message}
            </p>
          )}
          {serverErrors.expirationDate && (
            <p className='text-destructive text-xs animate-pulse'>
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
              <span className='ml-2'>modifier1...</span>
            </>
          ) : (
            <span>modifier le produit</span>
          )}
        </Button>
      </div>
    </form>
  );
}
