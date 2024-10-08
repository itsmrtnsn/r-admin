import { z } from 'zod';

const createProductCategorySchema = z.object({
  name: z
    .string({ required_error: 'Le nom de la catégorie est requis' })
    .min(3, {
      message: 'Le nom de la catégorie doit contenir au moins 3 caractères',
    })
    .max(150, {
      message: 'Le nom de la catégorie doit contenir au plus 150 caractères',
    }),
  slug: z
    .string({
      required_error: 'Le slug de la catégorie est requis',
    })
    .min(3, {
      message: 'Le slug de la catégorie doit contenir au moins 3 caractères',
    })
    .max(150, {
      message: 'Le slug de la catégorie doit contenir au plus 150 caractères',
    }),
  description: z
    .string({
      required_error: 'La description de la catégorie est requise',
    })
    .min(10, {
      message:
        'La description de la catégorie doit contenir au moins 10 caractères',
    })
    .max(255, {
      message:
        'La description de la catégorie doit contenir au plus 255 caractères',
    }),
});

export default createProductCategorySchema;
