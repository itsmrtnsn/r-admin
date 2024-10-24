'use server';

import prisma from '@/prisma/client';

const getCategory = async () => {
  try {
    const categories = await prisma.category.findMany({
      select: { name: true, slug: true, id: true },
    });
    return categories.length > 0
      ? categories
      : [{ name: 'Aucune catégorie disponible', slug: 'aucun', id: '-' }];
  } catch (error) {
    return {
      error:
        'Impossible de récupérer les catégories. Veuillez réessayer ultérieurement.',
    };
  }
};

export default getCategory;
