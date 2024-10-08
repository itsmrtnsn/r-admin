'use server';

import prisma from '@/prisma/client';
import { revalidatePath } from 'next/cache';
import createEmployeeSchema from '../_schema/create-employee-schema';
import { CreateEmployeeFormData } from '../_types/create-employee-form-data';
import DayOffOption from '../_types/day-off-option';

export async function createEmployee(data: CreateEmployeeFormData) {
  const result = createEmployeeSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: true,
      message: result.error.errors[0].message,
    };
  }

  const existingEmail = await prisma.employee.findUnique({
    where: { email: result.data.email },
  });

  if (existingEmail) {
    return {
      success: false,
      errors: true,
      message: 'Cet e-mail est déjà utilisé',
    };
  }

  // Check if phone number already exists
  // const existingPhone = await prisma.employee.findUnique({
  //   where: { phone: result.data.phone },
  // });
  // if (existingPhone) {
  //   return {
  //     success: false,
  //     errors: true,
  //     message: 'Phone number already exists.',
  //   };
  // }

  // Create dummy date to avoid errors
  const dummyDate = '1970-01-01';
  const shiftStart = new Date(`${dummyDate} ${result.data.shiftStart}`);
  const shiftEnd = new Date(`${dummyDate} ${result.data.shiftEnd}`);

  try {
    const newEmployee = await prisma.employee.create({
      data: {
        id: result.data.employeeId,
        firstName: result.data.firstName,
        lastName: result.data.lastName,
        email: result.data.email,
        phone: result.data.phone,
        position: result.data.position,
        shiftStart: shiftStart,
        shiftEnd: shiftEnd,
        gender: result.data.gender,
        status: result.data.status,
        dayOff: (result.data.dayOff as DayOffOption) || null,
      },
    });

    revalidatePath('/dashboard/employees');
    return { success: true, data: newEmployee };
  } catch (error) {
    return {
      success: false,
      errors: true,
      message: `Une erreur s'est produite lors de la création du nouvel employé`,
    };
  }
}
