'use server';

import prisma from '@/prisma/client';

export async function getProductById(product_id: string) {
  const existProduct = await prisma.product.findUnique({
    where: { id: product_id },
  });

  if (!existProduct) {
    return {
      success: false,
      message: 'Employé non trouvé',
    };
  }
  try {
    const product = await prisma.product.findUnique({
      where: { id: product_id },
    });

    return {
      success: true,
      message: 'Employé trouvé',
      product,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Une erreur est survenue',
    };
  }
}
