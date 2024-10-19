'use server';

import prisma from '@/prisma/client';
import { revalidatePath } from 'next/cache';

export async function deleteProduct(productId: string) {
  const existingProduct = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!existingProduct) {
    return {
      success: false,
      message: 'Article not found',
    };
  }

  try {
    await prisma.product.delete({
      where: { id: productId },
    });

    revalidatePath('/dashboard/products');

    return {
      success: true,
      message: 'product deleted successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error deleting productP∏',
    };
  }
}
