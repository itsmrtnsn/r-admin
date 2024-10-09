'use server';

import prisma from '@/prisma/client';
import { revalidatePath } from 'next/cache';
import { EditEmployeeFormData } from '../_types/edit-employee-form-data';
import editEmployeeFormSchema from '../_schema/edit-employee-form-schema';
import DayOffOption from '../_types/day-off-option';
export async function editEmployee(data: EditEmployeeFormData) {
  const result = editEmployeeFormSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: true,
      message: result.error.errors[0].message,
    };
  }

  const existingEmployee = await prisma.employee.findUnique({
    where: { id: result.data.employeeId },
  });

  if (!existingEmployee) {
    return {
      success: false,
      errors: true,
      message: 'Employé non trouvé',
    };
  }

  const existingEmail = await prisma.employee.findFirst({
    where: {
      email: result.data.email,
      id: { not: result.data.employeeId }, // Exclude current employee
    },
  });

  if (existingEmail) {
    return {
      success: false,
      errors: true,
      message: 'Cet e-mail est déjà utilisé',
    };
  }

  // Create dummy date to avoid errors
  const dummyDate = '1970-01-01';
  const shiftStart = new Date(`${dummyDate} ${result.data.shiftStart}`);
  const shiftEnd = new Date(`${dummyDate} ${result.data.shiftEnd}`);

  const updateData: any = {
    position: result.data.position,
    shiftStart: shiftStart,
    shiftEnd: shiftEnd,
    status: result.data.status,
    dayOff: result.data.dayOff || null, // Handle undefined or null dayOff correctly
  };

  if (result.data.dayOff !== existingEmployee.dayOff) {
    updateData.dayOff = result.data.dayOff
      ? (result.data.dayOff as DayOffOption)
      : null;
  }

  // Only update email and phone if they have new values
  if (result.data.email !== existingEmployee.email) {
    updateData.email = result.data.email;
  }

  if (result.data.phone !== existingEmployee.phone) {
    updateData.phone = result.data.phone;
  }

  try {
    const newEmployee = await prisma.employee.update({
      where: { id: result.data.employeeId },
      data: updateData,
    });

    revalidatePath('/dashboard/employees');
    return { success: true, data: newEmployee };
  } catch (error) {
    return {
      success: false,
      errors: true,
      message: `Une erreur s'est produite lors de la modification de l'employé`,
    };
  }
}
