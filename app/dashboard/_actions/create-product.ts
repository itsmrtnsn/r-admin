'use server';
import prisma from '@/prisma/client';
import createProductFormSchema from '../_schema/create-product-form-schema';
import CreateProductFormData from '../_types/create-product-form-data';
import { revalidatePath } from 'next/cache';

const cretaeProduct = async (data: CreateProductFormData) => {
  const result = createProductFormSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: true,
      message: result.error.errors[0].message,
    };
  }

  const date = new Date(`${result.data.expirationDate}`);

  try {
    const newProducts = await prisma.product.create({
      data: {
        name: result.data.name,
        price: result.data.price,
        quantityInStock: result.data.quantity,
        threshold: result.data.threshold,
        status: result.data.status,
        categoryId: result.data.category,
        expirationDate: date,
      },
    });
    revalidatePath('/dashboard/products');
    return { success: true, data: newProducts };
  } catch (error) {
    return {
      success: false,
      errors: true,
      message: `Une erreur s'est produite lors de la creation ...`,
    };
  }
};

export default cretaeProduct;
