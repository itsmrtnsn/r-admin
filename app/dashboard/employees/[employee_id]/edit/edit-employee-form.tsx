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
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { editEmployee } from '@/app/dashboard/_actions/edit-employee';
import editEmployeeFormSchema from '@/app/dashboard/_schema/edit-employee-form-schema';
import { dayOffOptionList } from '@/app/dashboard/_types/day-off-option';
import { EditEmployeeFormData } from '@/app/dashboard/_types/edit-employee-form-data';
import { employeeStatusOptionList } from '@/app/dashboard/_types/employee-status-option';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { EditEmployeeInputFields } from './edit-employee-input-fields';

interface Props {
  employeeId: string;
  initialData: EditEmployeeFormData;
}

export default function EditEmployeeForm({ employeeId, initialData }: Props) {
  const router = useRouter();
  const [serverErrors, setServerErrors] = useState<
    Partial<Record<keyof EditEmployeeFormData, string[]>>
  >({});

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditEmployeeFormData>({
    resolver: zodResolver(editEmployeeFormSchema),
    defaultValues: {
      email: initialData.email,
      phone: initialData.phone,
      position: initialData.position,
      shiftStart: initialData.shiftStart,
      shiftEnd: initialData.shiftEnd,
      dayOff: initialData.dayOff,
      status: initialData.status,
    },
  });

  const onSubmit = async (data: EditEmployeeFormData) => {
    const result = await editEmployee({ ...data, employeeId });

    if (result.success) {
      toast.success('Employé modifié avec succès');
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
          {EditEmployeeInputFields.map(({ label, name, type, placeholder }) => (
            <div className='space-y-2' key={name}>
              <Label htmlFor={name} className='text-sm font-medium'>
                {label}
              </Label>
              <Input
                id={name}
                type={type}
                {...register(name as keyof EditEmployeeFormData)}
                placeholder={placeholder}
                defaultValue={initialData[name as keyof EditEmployeeFormData]}
                className='border-[0.1px] h-10 shadow-none bg-black rounded-md p-2 focus:border-blue-500 focus:outline-none  focus:ring-blue-600 focus:ring-2 transition duration-300'
              />
              {errors[name as keyof EditEmployeeFormData] && (
                <p className='text-xs text-red-500 animate-pulse'>
                  {errors[name as keyof EditEmployeeFormData]?.message}
                </p>
              )}
              {serverErrors[name as keyof EditEmployeeFormData] && (
                <p className='text-xs text-red-500 animate-pulse'>
                  {serverErrors[name as keyof EditEmployeeFormData]?.[0]}
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
                <span className='text-muted-foreground'>Modifier</span>
              </p>
            ) : (
              <p className='flex items-center gap-2 '>Modifier</p>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
