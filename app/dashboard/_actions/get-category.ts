'use server';

import prisma from '@/prisma/client';

const getCategory = async () => {
  try {
    const categories = await prisma.category.findMany({
      select: { name: true, slug: true, id: true },
    });
    return categories;
  } catch (error) {
    return { error: 'error fetching ....' };
  }
};
export default getCategory;
