import { z } from 'zod';
import { productStatus } from '../data/product-status';
import { productCategory } from '../data/product-category';

export const productInfoSchema = z.object({
  name: z
    .string({ required_error: 'Le nom est requis' })
    .min(3, {
      message: 'Le nom doit contenir au moins 3 caractères',
    })
    .max(100, {
      message: 'Le nom doit contenir au plus 100 caractères',
    }),
  price: z
    .number({
      required_error: 'Le prix est requis',
      invalid_type_error: 'Le prix doit être un nombre',
    })
    .min(1, {
      message: 'Le prix doit être un nombre positif',
    }),
  quantityInStock: z
    .number({
      required_error: 'La quantité en stock est requise',
      invalid_type_error: 'La quantité en stock doit être un nombre',
    })
    .min(1, {
      message: 'La quantité en stock doit être un nombre positif',
    }),
  threshold: z
    .number({
      required_error: 'Le seuil est requis',
      invalid_type_error: 'Le seuil doit être un nombre',
    })
    .min(1, {
      message: 'Le seuil doit être un nombre positif',
    }),
  category: z.enum(productCategory, {
    errorMap: () => ({ message: 'Category is required' }),
  }),
  status: z.enum(productStatus, {
    errorMap: () => ({ message: 'Status is required' }),
  }),
});

export type ProductInfo = z.infer<typeof productInfoSchema>;
