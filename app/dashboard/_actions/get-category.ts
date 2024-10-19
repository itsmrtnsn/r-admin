'use server';

import prisma from '@/prisma/client';

const getCategory = async () => {
  try {
    const categories = await prisma.category.findMany({
      select: { name: true, slug: true, id: true },
    });
    return categories.length > 0
      ? categories
      : [{ name: 'No categories available', slug: 'none', id: '-' }];
  } catch (error) {
    return { error: 'Failed to fetch categories. Please try again later.' };
  }
};

export default getCategory;
