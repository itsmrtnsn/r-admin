import { z } from 'zod';
import productStatusOption, {
  productStatusOptionList,
} from '../_types/product-status-option';

const createProductSchema = z.object({
  name: z.string({ required_error: 'Le nom du produit est requis' }),
  price: z
    .number({ required_error: 'Le prix du produit est requis' })
    .min(1, {
      message: 'Le prix du produit doit être supérieur à 0',
    })
    .max(1000000, {
      message: 'Le prix du produit doit être inférieur à 1 000 000',
    }),
  quantityInStock: z
    .number({
      required_error: 'La quantité en stock est requise',
    })
    .min(1, {
      message: 'La quantité en stock doit être supérieure à 0',
    })
    .max(1000000, {
      message: 'La quantité en stock doit être inférieure à 1 000 000',
    }),
  threshold: z
    .number({ required_error: 'Le seuil est requis' })
    .min(1, {
      message: 'Le seuil doit être supérieur à 0',
    })
    .max(1000000, {
      message: 'Le seuil doit être inférieur à 1 000 000',
    }),
  categoryId: z.string({
    required_error: 'La catégorie du produit est requise',
  }),
  status: z.enum(productStatusOptionList, {
    errorMap: () => ({ message: 'Fournir un statut de produit valide' }),
  }),
});

export default createProductSchema;
