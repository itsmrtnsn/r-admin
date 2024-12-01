'use server';

import prisma from '@/prisma/client';

const getCustomerSummary = async () => {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const [totalCustomers, maleCustomers, femaleCustomers] = await Promise.all([
      // Total customers
      prisma.customer.count(),

      // Male customers
      prisma.customer.count({
        where: { Gender: 'MEN' },
      }),

      // Female customers
      prisma.customer.count({
        where: { Gender: 'WOMEN' },
      }),
    ]);

    return {
      totalCustomers,
      maleCustomers,
      femaleCustomers,
    };
  } catch (error) {
    console.error('Error retrieving customer summary:', error);
    return null;
  }
};

export default getCustomerSummary;
