'use server';

import prisma from '@/prisma/client';
import { EmployeeFormData, employeeSchema } from './employee-schema';

export async function registerEmployee(data: EmployeeFormData) {
  const result = employeeSchema.safeParse(data);

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }
  const dummyDate = '1970-01-01';
  const shiftStart = new Date(`${dummyDate} ${result.data.shiftStart}`);
  const shiftEnd = new Date(`${dummyDate} ${result.data.shiftEnd}`);

  const newEmployee = await prisma.employee.create({
    data: {
      id: result.data.employeeId,
      firstName: result.data.firstName,
      lastName: result.data.lastName,
      email: result.data.email,
      phone: result.data.phone,
      position: result.data.position,
      shiftStart: result.data.shiftStart,
      shiftEnd: result.data.shiftEnd,
      gender: result.data.gender,
    },
  });
  console.log(result.data);

  return { success: true, data: result.data };
}
