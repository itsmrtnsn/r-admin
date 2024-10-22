'use server';

import prisma from '@/prisma/client';

const getSellableProducts = async () => {
  try {
    const sellableProducts = await prisma.product.findMany({
      where: { status: 'active' },
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
