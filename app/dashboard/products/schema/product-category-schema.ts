import { z } from 'zod';

const productCategorySchema = z.object({
  category: z.enum(['in_stock', 'out_of_stock', 'low_stock'], {
    errorMap: () => ({ message: 'Category is required' }),
  }),
  status: z.enum(['draft', 'published', 'archived'], {
    errorMap: () => ({ message: 'Status is required' }),
  }),
});

export type ProductCategory = z.infer<typeof productCategorySchema>;
