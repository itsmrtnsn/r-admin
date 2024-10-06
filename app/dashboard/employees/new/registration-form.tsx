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
import { toast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { registerEmployee } from './actions';
import {
  dayOff,
  EmployeeFormData,
  employeeSchema,
  gender,
} from './employee-schema';
import { InputFields } from './input-fields';

export default function EmployeeRegistrationForm() {
  const [serverErrors, setServerErrors] = useState<
    Partial<Record<keyof EmployeeFormData, string[]>>
  >({});
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
  });

  const onSubmit = async (data: EmployeeFormData) => {
    const result = await registerEmployee(data);
    if (result.success) {
      toast({
        title: 'Employee Registered',
        description: 'The employee has been successfully registered.',
      });
      setServerErrors({});
    } else {
      setServerErrors(result.errors || {});
      toast({
        title: 'Registration Failed',
        description: 'Please check the form for errors.',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='p-4'>
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
                {...register(name as keyof EmployeeFormData)}
                placeholder={placeholder}
                className='border-[0.1px] h-10 shadow-none bg-black rounded-md p-2 focus:border-blue-500 focus:outline-none  focus:ring-blue-600 focus:ring-2 transition duration-300'
              />
              {errors[name as keyof EmployeeFormData] && (
                <p className='text-xs text-red-500 animate-pulse'>
                  {errors[name as keyof EmployeeFormData]?.message}
                </p>
              )}
              {serverErrors[name as keyof EmployeeFormData] && (
                <p className='text-xs text-red-500 animate-pulse'>
                  {serverErrors[name as keyof EmployeeFormData]?.[0]}
                </p>
              )}
            </div>
          ))}
          <div className='space-y-2'>
            <Label htmlFor='department' className='font-medium'>
              Department
            </Label>
            <Controller
              name='department'
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className='border-[0.1px] h-10 bg-black shadow-none  rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-200'>
                    <SelectValue placeholder='Sélectionnez un département' />
                  </SelectTrigger>
                  <SelectContent>
                    {['engineering', 'marketing', 'sales', 'hr', 'finance'].map(
                      (dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept.charAt(0).toUpperCase() + dept.slice(1)}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.department && (
              <p className='text-xs text-red-500 animate-pulse'>
                {errors.department?.message}
              </p>
            )}
            {serverErrors.department && (
              <p className='text-xs text-red-500 animate-pulse'>
                {serverErrors.department?.[0]}
              </p>
            )}
          </div>
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
                    {dayOff.map((day) => (
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
                  {gender.map((gender) => (
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
        </div>

        <div className='flex justify-end'>
          <Button
            type='submit'
            size='lg'
            className='h-10 w-[230px] text-base font-normal bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 transition duration-200'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register Employee'}
          </Button>
        </div>
      </div>
    </form>
  );
}
