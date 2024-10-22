'use server';

import prisma from '@/prisma/client';

const getPproductSummary = async () => {
  try {
    const totalProducts = await prisma.product.count();
    const totalActiveProducts = await prisma.product.count({
      where: { status: 'active' },
    });
    const totalDraftProducts = await prisma.product.count({
      where: { status: 'draft' },
    });
    const totalArchivedProducts = await prisma.product.count({
      where: { status: 'draft' },
    });

    return {
      totalProducts,
      totalActiveProducts,
      totalDraftProducts,
      totalArchivedProducts,
    };
  } catch (error) {
    console.error('Error fetching product summary:', error);
    throw new Error('Could not fetch product summary. Please try again later.');
  }
};

export default getPproductSummary;
