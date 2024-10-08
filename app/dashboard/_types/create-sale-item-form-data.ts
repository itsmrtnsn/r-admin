import { z } from 'zod';
import createSaleItemSchema from '../_schema/create-sale-item-schema';
type CreateSaleItemFormData = z.infer<typeof createSaleItemSchema>;
export default CreateSaleItemFormData;
