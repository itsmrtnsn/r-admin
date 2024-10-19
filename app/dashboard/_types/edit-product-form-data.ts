import { z } from 'zod';
import editProductFormschema from '../_schema/edit-product-form-schema';

type EditProductFormData = z.infer<typeof editProductFormschema>;
export default EditProductFormData;
