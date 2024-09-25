'use server';

import prisma from '@/prisma/client';

export const getProducts = async (
  status?:
    | 'all'
    | 'out_of_stock'
    | 'low_stock'
    | 'stock_ok'
    | 'archived'
    | 'draft',
  page: number = 1,
  itemsPerPage: number = 10
) => {
  let whereCondition = {};
  if (!status || status === 'all') {
    // Return all products, no filter needed
  } else if (status === 'archived') {
    whereCondition = { status: 'archived' };
  } else if (status === 'draft') {
    whereCondition = { status: 'draft' };
  } else {
    // For all other statuses, check if the product is active
    whereCondition = { status: 'active' };

    if (status === 'out_of_stock') {
      whereCondition = {
        ...whereCondition,
        quantityInStock: 0,
      };
    } else if (status === 'low_stock') {
      whereCondition = {
        ...whereCondition,
        quantityInStock: { gt: 0, lt: prisma.product.fields.threshold },
      };
    } else if (status === 'stock_ok') {
      whereCondition = {
        ...whereCondition,
        quantityInStock: { gte: prisma.product.fields.threshold },
      };
    }
  }

  const skip = (page - 1) * itemsPerPage;

  const [results, totalCount] = await Promise.all([
    prisma.product.findMany({
      where: whereCondition,
      include: {
        category: {
          select: {
            name: true,
          },
        },
        sales: true,
      },
      orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
      skip,
      take: itemsPerPage,
    }),
    prisma.product.count({ where: whereCondition }),
  ]);

  const products = results.map((product) => ({
    ...product,
    quantitySold: product.sales.reduce(
      (total, sale) => total + sale.quantity,
      0
    ),
  }));

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return {
    products,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems: totalCount,
      itemsPerPage,
    },
  };
};
