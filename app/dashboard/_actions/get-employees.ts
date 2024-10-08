'use server';

import prisma from '@/prisma/client';

export const getEmployees = async () => {
  const employees = await prisma.employee.findMany();
  return employees;
};
