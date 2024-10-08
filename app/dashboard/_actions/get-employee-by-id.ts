'use server';

import prisma from '@/prisma/client';

export async function getEmployeeById(employeeId: string) {
  const isEmployeeExist = await prisma.employee.findUnique({
    where: { id: employeeId },
  });

  if (!isEmployeeExist) {
    return {
      success: false,
      message: 'Employé non trouvé',
    };
  }
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
    });

    return {
      success: true,
      message: 'Employé trouvé',
      employee,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Une erreur est survenue',
    };
  }
}
