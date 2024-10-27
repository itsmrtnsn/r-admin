import { z } from 'zod';
import { productStatusOptionList } from '../_types/product-status-option';

const createProductFormSchema = z.object({
  name: z
    .string()
    .min(2, `Le nom de l'article doit comporter au moins 2 caractères`)
    .max(100, { message: `Article name must be at most 100 characters` }),

  category: z.string({
    required_error: `la catégorie d'article est obligatoire`,
    invalid_type_error: `la catégorie d'article n'est pas valide`,
  }),
  price: z
    .number({ invalid_type_error: `Le prix de l'article doit être un nombre` })
    .positive(`Le prix doit être un nombre positif`),
  costPrice: z
    .number({ required_error: 'The cost price is required' })
    .positive(`Le cost price doit être un nombre positif`),
  quantity: z
    .number({
      invalid_type_error: `la quantité de l'article doit être un chiffre`,
    })
    .int()
    .nonnegative(`La quantité doit être un entier non négatif`),
  threshold: z
    .number({
      invalid_type_error: `Le seuil doit être au moins égal à 1`,
    })
    .int()
    .nonnegative(`Le seuil doit être un entier non négatif`),

  status: z.enum(productStatusOptionList, {
    errorMap: () => ({
      message: "le statut de l'article est requis",
    }),
  }),

  expirationDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: `Format de date non valide`,
  }),
});
export default createProductFormSchema;
