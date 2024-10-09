'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { generateEmployeeId } from '@/lib/generate-employee-id';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { createEmployee } from '../../_actions/create-employee';
import createEmployeeSchema from '../../_schema/create-employee-schema';
import { CreateEmployeeFormData } from '../../_types/create-employee-form-data';

import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { dayOffOptionList } from '../../_types/day-off-option';
import { employeeStatusOptionList } from '../../_types/employee-status-option';
import { genderOptionList } from '../../_types/gender-option';
import { InputFields } from './input-fields';
import { toast } from 'sonner';

export default function EmployeeRegistrationForm() {
  const router = useRouter();
  const [serverErrors, setServerErrors] = useState<
    Partial<Record<keyof CreateEmployeeFormData, string[]>>
  >({});

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateEmployeeFormData>({
    resolver: zodResolver(createEmployeeSchema),
  });

  const onSubmit = async (data: CreateEmployeeFormData) => {
    const employeeId = `${data.firstName[0]}${
      data.lastName[0]
    }${generateEmployeeId()}`;
    const result = await createEmployee({ ...data, employeeId });

    if (result.success) {
      toast.success('Employé créé avec succès');
      reset();
      router.push('/dashboard/employees');
    }

    if (result.errors) {
      toast.error(result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='p-4'>
      <Input type='text' {...register('employeeId')} className='sr-only' />
      <div className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {InputFields.map(({ label, name, type, placeholder }) => (
            <div className='space-y-2' key={name}>
              <Label htmlFor={name} className='text-sm font-medium'>
                {label}
              </Label>
              <Input
                id={name}
                type={type}
                {...register(name as keyof CreateEmployeeFormData)}
                placeholder={placeholder}
                className='border-[0.1px] h-10 shadow-none bg-black rounded-md p-2 focus:border-blue-500 focus:outline-none  focus:ring-blue-600 focus:ring-2 transition duration-300'
              />
              {errors[name as keyof CreateEmployeeFormData] && (
                <p className='text-xs text-red-500 animate-pulse'>
                  {errors[name as keyof CreateEmployeeFormData]?.message}
                </p>
              )}
              {serverErrors[name as keyof CreateEmployeeFormData] && (
                <p className='text-xs text-red-500 animate-pulse'>
                  {serverErrors[name as keyof CreateEmployeeFormData]?.[0]}
                </p>
              )}
            </div>
          ))}

          <div className='space-y-2'>
            <Label htmlFor='dayOff' className='font-medium'>
              Jour de repos
            </Label>
            <Controller
              name='dayOff'
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className='border-[0.1px] h-10 bg-black shadow-none  rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200'>
                    <SelectValue placeholder='Sélectionnez un jour de repos' />
                  </SelectTrigger>
                  <SelectContent>
                    {dayOffOptionList.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day.charAt(0).toUpperCase() + day.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.dayOff && (
              <p className='text-xs text-red-500 animate-pulse'>
                {errors.dayOff.message}
              </p>
            )}
            {serverErrors.dayOff && (
              <p className='text-xs text-red-500 animate-pulse'>
                {serverErrors.dayOff[0]}
              </p>
            )}
          </div>

          <div className='space-y-2 mt-3'>
            <Label className='font-medium'>Genre</Label>
            <Controller
              name='gender'
              control={control}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className='flex space-x-4'
                >
                  {genderOptionList.map((gender) => (
                    <div className='flex items-center space-x-2' key={gender}>
                      <RadioGroupItem
                        value={gender}
                        id={gender}
                        className='h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500'
                      />
                      <Label htmlFor={gender} className='font-medium'>
                        {gender.charAt(0).toUpperCase() + gender.slice(1)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
            {errors.gender && (
              <p className='text-xs text-red-500 animate-pulse'>
                {errors.gender.message}
              </p>
            )}
            {serverErrors.gender && (
              <p className='text-xs text-red-500 animate-pulse'>
                {serverErrors.gender[0]}
              </p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='status' className='font-medium'>
              Statut
            </Label>
            <Controller
              name='status'
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className='border-[0.1px] h-10 bg-black shadow-none  rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-200'>
                    <SelectValue placeholder='Sélectionnez un statut' />
                  </SelectTrigger>
                  <SelectContent>
                    {employeeStatusOptionList.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.status && (
              <p className='text-xs text-red-500 animate-pulse'>
                {errors.status?.message}
              </p>
            )}
            {serverErrors.status && (
              <p className='text-xs text-red-500 animate-pulse'>
                {serverErrors.status?.[0]}
              </p>
            )}
          </div>
        </div>

        <div className='flex justify-end'>
          <Button
            type='submit'
            size='lg'
            className={cn(
              'h-10 px-6  rounded-sm font-normal bg-blue-700 text-white  p-2 hover:bg-blue-800 transition duration-200 text-sm'
            )}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <p className='flex items-center gap-2'>
                <Loader className='animate-spin' size={20} strokeWidth={0.75} />
                <span className='text-muted-foreground'>
                  Création d'un nouvel employé
                </span>
              </p>
            ) : (
              <p className='flex items-center gap-2 '>
                Créer un nouvel employé
              </p>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
