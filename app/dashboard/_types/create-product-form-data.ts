import { z } from 'zod';
import createProductFormSchema from '../_schema/create-product-form-schema';

type CreateProductFormData = z.infer<typeof createProductFormSchema>;
export default CreateProductFormData;
