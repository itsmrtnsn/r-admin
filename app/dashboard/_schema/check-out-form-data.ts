import { z } from 'zod';
import checkOutFormSchema from './check-out-form-schema';

type CheckOutFormData = z.infer<typeof checkOutFormSchema>;
export default CheckOutFormData;
