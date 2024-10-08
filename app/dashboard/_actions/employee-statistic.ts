'use server';

import prisma from '@/prisma/client';

export const getEmployeeStatistics = async () => {
  const totalEmployees = await prisma.employee.count();
  const totalActiveEmployees = await prisma.employee.count({
    where: { status: 'actif' },
  });
  const totalMen = await prisma.employee.count({
    where: { gender: 'homme' },
  });
  const totalWomen = await prisma.employee.count({
    where: { gender: 'femme' },
  });

  return {
    totalEmployees,
    totalActiveEmployees,
    totalMen,
    totalWomen,
  };
};
