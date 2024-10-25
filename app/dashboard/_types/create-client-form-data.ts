import { z } from 'zod';
import createCustomerSchema from '../_schema/create-client-form-schema';

export type CreateCustomerFormData = z.infer<typeof createCustomerSchema>;
