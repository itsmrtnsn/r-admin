import { z } from 'zod';
import createProductSchema from '../_schema/create-product-chema';

type CreateProductFormData = z.infer<typeof createProductSchema>;
export default CreateProductFormData;
