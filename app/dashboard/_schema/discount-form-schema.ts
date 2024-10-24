import { z } from 'zod';

export const discountFormSchema = z
  .object({
    discountType: z.enum(['PERCENTAGE', 'FIXED']).optional(), // Make discountType optional
    discountValue: z
      .number()
      .min(0, {
        message: 'Discount value must be a positive number',
      })
      .optional(), // Make discountValue optional
  })
  .refine(
    (data) => {
      // If discountType is provided, discountValue must also be provided
      if (data.discountType && !data.discountValue) {
        return false;
      }
      // If discountValue is provided, discountType must also be provided
      if (data.discountValue && !data.discountType) {
        return false;
      }
      return true;
    },
    {
      message: 'Both discount type and value are required if one is provided',
    }
  );
