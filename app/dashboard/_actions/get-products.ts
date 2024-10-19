'use server';

import prisma from '@/prisma/client';
import { ProductStatus } from '@prisma/client';

export interface ProductType {
  id: string;
  name: string;
  price: number;
  quantityInStock: number;
  category: string;
  status: ProductStatus;
  threshold: number;
}

export const getProducts = async (
  searchQuery?: string,
  page: number = 1,
  itemsPerPage: number = 1
): Promise<{ products: ProductType[]; totalPages: number }> => {
  try {
    const [products, totalCount] = await prisma.$transaction([
      prisma.product.findMany({
        include: { category: { select: { name: true } } },
        where: searchQuery
          ? {
              name: {
                contains: searchQuery,
                mode: 'insensitive', // Case insensitive search
              },
            }
          : undefined,
        skip: (page - 1) * itemsPerPage,
        take: itemsPerPage,
      }),
      prisma.product.count({
        where: searchQuery
          ? {
              name: {
                contains: searchQuery,
                mode: 'insensitive',
              },
            }
          : undefined,
      }),
    ]);

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return {
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        quantityInStock: product.quantityInStock,
        category: product.category.name,
        status: product.status,
        threshold: product.threshold,
      })),
      totalPages,
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Could not fetch products. Please try again later.');
  }
};
