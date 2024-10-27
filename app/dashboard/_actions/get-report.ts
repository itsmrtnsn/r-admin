'use server';

import prisma from '@/prisma/client';

const getReports = async () => {
  const totalSales = await prisma.sale.count();
  const totalRevenue = await prisma.sale.aggregate({
    _sum: {
      total: true,
    },
  });

  return {
    totalSales,
    totalRevenue: totalRevenue._sum.total || 0,
  };
};
