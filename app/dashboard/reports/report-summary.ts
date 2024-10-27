'use server';

import prisma from '@/prisma/client';

const reportSummary = async (startDate?: Date, endDate?: Date) => {
  const currentDate = new Date();
  startDate = startDate || new Date(currentDate.setHours(0, 0, 0, 0));
  endDate = endDate || new Date(currentDate.setHours(23, 59, 59, 999));

  const totalSales = await prisma.sale.count({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  const revenue = await prisma.sale.aggregate({
    _sum: {
      total: true,
    },
    _avg: {
      total: true,
    },
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  const newCustomers = await prisma.customer.count({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  const salesByCategory = await prisma.sale.groupBy({
    by: ['category'], // Grouping directly by the 'category' field
    _sum: {
      total: true,
    },
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  const salesByCategoryFormatted = salesByCategory.map((sale) => ({
    name: sale.category,
    value: sale._sum.total || 0,
  }));

  return {
    totalSales,
    totalRevenue: revenue._sum.total || 0,
    averageOrderValue: revenue._avg.total?.toFixed(2) || 0,
    newCustomers,
    salesByCategory: salesByCategoryFormatted,
  };
};

export default reportSummary;
