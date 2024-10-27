'use server';

import prisma from '@/prisma/client';

const salesRepport = async () => {
  try {
    const sales = await prisma.sale.findMany({
      select: {
        id: true,
        reference: true,
        total: true,
        createdAt: true,
        cashier: true,
      },
    });
    return sales;
  } catch (error) {}
};

export default salesRepport;
