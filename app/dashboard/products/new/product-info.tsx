'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Control, Controller, FieldError, useForm } from 'react-hook-form';
import { productCategory } from '../data/product-category';
import { productStatus } from '../data/product-status';
import {
  productInfoSchema,
  type ProductInfo,
} from '../schema/product-info-schema';

interface ProductInfoFormProps {
  onSubmit: (data: ProductInfo) => void;
}

const ProductInfoForm: React.FC<ProductInfoFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<ProductInfo>({
    resolver: zodResolver(productInfoSchema),
  });

  const handleFormSubmit = (data: ProductInfo) => {
    onSubmit(data);
    reset();
  };

  return (
    <form
      className='grid grid-cols-[1fr_auto] gap-8'
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Card
        x-chunk='dashboard-07-chunk-0'
        className='shadow-none bg-white border-[0.1px] rounded-xl pb-4'
      >
        <CardHeader>
          <CardTitle>Détails de l'article</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid gap-8'>
            <div className='flex gap-3 items-center'>
              <div className='w-full space-y-3 text-xs'>
                <Label htmlFor='name'>
                  <p
                    className={`transition-all duration-300 ${
                      errors.name ? 'text-red-500' : ''
                    }`}
                  >
                    {errors.name ? errors.name.message : 'Name'}
                  </p>
                </Label>
                <Input
                  id='name'
                  type='text'
                  {...register('name')}
                  className='w-full border-slate-400 border-[0.1px] placeholder:text-gray-600 placeholder:text-sm focus-visible:ring-1 outline-none focus-visible:border-none transition-all ease-in-out duration-300 hover:border-gray-300 focus:scale-[1.02]'
                />
              </div>
              <div className='w-full space-y-3'>
                <Label htmlFor='description'>
                  <p
                    className={`transition-all duration-300 ${
                      errors.price ? 'text-red-500' : ''
                    }`}
                  >
                    {errors.price ? errors.price.message : 'Prix'}
                  </p>
                </Label>
                <Input
                  id='description'
                  defaultValue=''
                  {...register('price', { valueAsNumber: true })}
                  className=' w-full border-slate-400 border-[0.1px] placeholder:text-gray-600 placeholder:text-sm focus-visible:ring-1 outline-none focus-visible:border-none transition-all ease-in-out duration-300 hover:border-gray-300 focus:scale-[1.02]'
                />
              </div>
            </div>

            <div className='flex gap-3 items-center'>
              <div className='w-full space-y-3'>
                <Label htmlFor='description'>
                  <p
                    className={`transition-all duration-300 ${
                      errors.quantityInStock ? 'text-red-500' : ''
                    }`}
                  >
                    {errors.quantityInStock
                      ? errors.quantityInStock.message
                      : 'Quantité'}
                  </p>
                </Label>
                <Input
                  id='description'
                  {...register('quantityInStock', { valueAsNumber: true })}
                  className=' w-full border-slate-400 border-[0.1px] placeholder:text-gray-600 placeholder:text-sm focus-visible:ring-1 outline-none focus-visible:border-none transition-all ease-in-out duration-300 hover:border-gray-300 focus:scale-[1.02]'
                />
              </div>
              <div className='w-full space-y-3'>
                <Label htmlFor='description'>
                  <p
                    className={`transition-all duration-300 ${
                      errors.threshold ? 'text-red-500' : ''
                    }`}
                  >
                    {errors.threshold ? errors.threshold.message : 'Seuil'}
                  </p>
                </Label>
                <Input
                  id='description'
                  {...register('threshold', { valueAsNumber: true })}
                  className=' w-full border-slate-400 border-[0.1px] placeholder:text-gray-600 placeholder:text-sm focus-visible:ring-1 outline-none focus-visible:border-none transition-all ease-in-out duration-300 hover:border-gray-300 focus:scale-[1.02]'
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* other section */}
      <div className='max-w-[20rem]'>
        <Card
          x-chunk='dashboard-07-chunk-2'
          className='bg-muted  shadow-none  bg-white border-[0.1px] rounded-xl'
        >
          <CardHeader>
            <CardTitle>Catégorie de l'article</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='w-full'>
              <div className='grid gap-3'>
                <Label htmlFor='category'>
                  <p
                    className={`transition-all duration-300 ${
                      errors.category ? 'text-red-500' : ''
                    }`}
                  >
                    {errors.category ? errors.category.message : 'Catégorie'}
                  </p>
                </Label>
                <Controller
                  control={control}
                  name='category'
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Product category' />
                      </SelectTrigger>
                      <SelectContent>
                        {productCategory.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className='space-y-3 mt-4'>
                <Label>
                  <p
                    className={`transition-all duration-300 ${
                      errors.status ? 'text-red-500' : ''
                    }`}
                  >
                    {errors.status ? errors.status.message : 'Statut'}
                  </p>
                </Label>
                <Controller
                  control={control}
                  name='status'
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Product status' />
                      </SelectTrigger>
                      <SelectContent>
                        {productStatus.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status === 'draft' && 'Brouillon'}
                            {status === 'published' && 'Publié'}
                            {status === 'archived' && 'Archivé'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='shadow-none bg-white border-[0.1px] rounded-xl mt-3'>
          <Button type='submit' className='w-full'>
            Créer
          </Button>
        </Card>
      </div>
    </form>
  );
};

export default ProductInfoForm;

interface ProductInputProps {
  label: string;
  name: string;
  control: Control<ProductInfo>;
  error: FieldError;
  [key: string]: any;
  className?: string;
}
