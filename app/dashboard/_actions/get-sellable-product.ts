'use server';

import prisma from '@/prisma/client';

export interface SellableProduct {
  id: string;
  name: string;
  price: number;
  category: {
    name: string;
  };
  quantityInStock: number;
}

const getSellableProducts = async (): Promise<SellableProduct[]> => {
  try {
    const sellableProducts = await prisma.product.findMany({
      where: { status: 'active' },
      select: {
        id: true,
        name: true,
        price: true,
        category: {
          select: {
            name: true,
          },
        },
        quantityInStock: true,
      },
    });
    return sellableProducts;
  } catch (error) {
    console.error('Error fetching sellable products:', error);
    throw new Error(
      'Could not fetch sellable products. Please try again later.'
    );
  }
};
export default getSellableProducts;
