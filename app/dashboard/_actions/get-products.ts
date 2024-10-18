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

export const getProducts = async (): Promise<ProductType[]> => {
  const products = await prisma.product.findMany({
    include: { category: { select: { name: true } } },
  });

  return products.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    quantityInStock: product.quantityInStock,
    category: product.category.name,
    status: product.status,
    threshold: product.threshold,
  }));
};
