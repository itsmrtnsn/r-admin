'use server';

import prisma from '@/prisma/client';
import { SaleCategory } from '@prisma/client';

const salesReport = async (
  searchQuery = '',
  page = 1,
  itemsPerPage = 10,
  category?: SaleCategory,
  startDate?: Date,
  endDate?: Date
) => {
  try {
    const skip = (page - 1) * itemsPerPage;
    const sales = await prisma.sale.findMany({
      where: {
        AND: [
          {
            OR: [
              { reference: { contains: searchQuery } },
              { cashier: { contains: searchQuery } },
            ],
          },
          category ? { category: category } : {}, // Apply category filter if provided
          startDate || endDate
            ? {
                createdAt: {
                  gte: startDate || new Date(), // Start date or current date
                  lte: endDate || new Date(), // End date or current date
                },
              }
            : {},
        ],
      },
      select: {
        id: true,
        reference: true,
        total: true,
        createdAt: true,
        cashier: true,
        category: true,
      },
      skip,
      take: itemsPerPage,
    });

    const totalSalesCount = await prisma.sale.count({
      where: {
        AND: [
          {
            OR: [
              { reference: { contains: searchQuery } },
              { cashier: { contains: searchQuery } },
            ],
          },
          category ? { category: category } : {},
          startDate || endDate
            ? {
                createdAt: {
                  gte: startDate || new Date(),
                  lte: endDate || new Date(),
                },
              }
            : {},
        ],
      },
    });

    const totalPage = Math.ceil(totalSalesCount / itemsPerPage);
    const totalRevenue = sales.reduce((total, sale) => total + sale.total, 0);

    return { sales, totalSalesCount, totalPage, totalRevenue };
  } catch (error) {
    console.error(error);
    return { sales: [], totalSalesCount: 0, totalPage: 0, totalRevenue: 0 };
  }
};

export default salesReport;
