'use server';

import prisma from '@/prisma/client';

const reportSummary = async () => {
  const totalSales = await prisma.sale.count();
  const revenue = await prisma.sale.aggregate({
    _sum: {
      total: true,
    },
    _avg: {
      total: true,
    },
  });

  const newCustomers = await prisma.customer.count();

  return {
    totalSales,
    totalRevenue: revenue._sum.total || 0,
    averageOrdervalue: revenue._avg.total?.toFixed(2) || 0,
    newCutomers: newCustomers,
  };
};

export default reportSummary;
