import { z } from 'zod';
import createProductCategorySchema from '../_schema/create-product-category-schema';
type CreateProductCategoryFormData = z.infer<
  typeof createProductCategorySchema
>;
export default CreateProductCategoryFormData;
