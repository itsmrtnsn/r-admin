'use client';

import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import createAttendanceSchema from '../_schema/attendance-form-schema';
import CreateAttendanceFormData from '../_types/create-attendance-form-data';
import createAttendance from './create-attendance';
import { Button } from '@/components/ui/button';

export default function AttendanceForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateAttendanceFormData>({
    resolver: zodResolver(createAttendanceSchema),
  });

  const onSubmit = async (data: CreateAttendanceFormData) => {
    const result = await createAttendance(data);

    if (result?.success) {
      toast.success('Employé créé avec succès');
      reset();
    }

    if (!result?.success) {
      toast.error(result?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='p-4 space-y-8'>
      <div>
        <Input
          id={'employee-id'}
          type={'text'}
          {...register('employeeId')}
          placeholder={'Employee ID'}
          className='border-[0.1px] border-gray-300 h-10 shadow-none bg-white rounded-md p-2 focus:border-blue-500 focus:outline-none  focus:ring-blue-600 focus:ring-2 transition duration-300'
        />
        {errors.employeeId && (
          <p className='text-xs text-destructive animate-pulse mt-1'>
            {errors.employeeId?.message}
          </p>
        )}
      </div>
      <Button type='submit' className='w-full' disabled={isSubmitting}>
        {isSubmitting ? 'Registering...' : 'Soumettre'}
      </Button>
    </form>
  );
}
