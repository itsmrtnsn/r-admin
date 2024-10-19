'use server';
import prisma from '@/prisma/client';
import { revalidatePath } from 'next/cache';
import editProductFormschema from '../_schema/edit-product-form-schema';
import EditProductFormData from '../_types/edit-product-form-data';

const editProduct = async (data: EditProductFormData) => {
  const result = editProductFormschema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: true,
      message: result.error.errors[0].message,
    };
  }

  const date = new Date(result.data.expirationDate); // No need for template literal

  const isProductExist = await prisma.product.findUnique({
    // Corrected to check in the Product model
    where: { id: result.data.id },
  });

  if (!isProductExist) {
    return {
      success: false,
      errors: true,
      message: 'Product not found', // Improved message clarity
    };
  }

  try {
    const editedProduct = await prisma.product.update({
      // Changed variable name for clarity
      where: { id: result.data.id },
      data: {
        name: result.data.name,
        price: result.data.price,
        quantityInStock: result.data.quantityInStock,
        threshold: result.data.threshold,
        status: result.data.status,
        categoryId: result.data.categoryId,
        expirationDate: date,
      },
    });
    console.log(editedProduct);
    revalidatePath('/dashboard/products');
    return { success: true, data: editedProduct }; // Changed variable name for clarity
  } catch (error) {
    return {
      success: false,
      errors: true,
      message: `Une erreur s'est produite lors de la modification du produit`, // Updated error message for clarity
    };
  }
};

export default editProduct;
