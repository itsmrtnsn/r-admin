import { z } from 'zod';
import createSaleSchema from '../_schema/create-sale-schema';
type CreateSaleFormData = z.infer<typeof createSaleSchema>;
export default CreateSaleFormData;
