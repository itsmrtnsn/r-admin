'use server';

import prisma from '@/prisma/client';

export const getCustomers = async (
  searchQuery?: string,
  page: number = 1,
  itemsPerPage: number = 1
): Promise<{ customers: any[]; totalPages: number }> => {
  try {
    const [customers, totalCount] = await prisma.$transaction([
      prisma.customer.findMany({
        where: searchQuery
          ? {
              firstName: {
                contains: searchQuery,
              },
            }
          : undefined,
        skip: (page - 1) * itemsPerPage,
        take: itemsPerPage,
      }),
      prisma.customer.count({
        where: searchQuery
          ? {
              lastName: {
                contains: searchQuery,
              },
            }
          : undefined,
      }),
    ]);

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return {
      customers,
      totalPages,
    };
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw new Error('Could not fetch customers. Please try again later.');
  }
};
