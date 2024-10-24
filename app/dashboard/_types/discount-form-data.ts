import { z } from 'zod';
import { discountFormSchema } from '../_schema/discount-form-schema';

export type DiscountFormData = z.infer<typeof discountFormSchema>;
