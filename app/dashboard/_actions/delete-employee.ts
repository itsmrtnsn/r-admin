'use server';

import prisma from '@/prisma/client';
import { revalidatePath } from 'next/cache';

export async function deleteEmployee(employeeId: string) {
  const existingEmployee = await prisma.employee.findUnique({
    where: { id: employeeId },
  });

  if (!existingEmployee) {
    return {
      success: false,
      message: 'Employee not found',
    };
  }

  try {
    await prisma.employee.delete({
      where: { id: employeeId },
    });

    revalidatePath('/dashboard/employees');

    return {
      success: true,
      message: 'Employee deleted successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error deleting employee',
    };
  }
}
