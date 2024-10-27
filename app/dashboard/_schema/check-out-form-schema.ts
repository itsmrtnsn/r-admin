import paymentOptions from '@/lib/payment-option';
import { z } from 'zod';

const checkOutFormSchema = z
  .object({
    paymentMethod: z.enum(
      paymentOptions.map((option) => option.value) as [string, ...string[]],
      {
        required_error: 'Veuillez sélectionner un mode de paiement.',
      }
    ),
    amountReceived: z.number().positive({
      message: 'Amount must be a valid number greater than 0.',
    }),
    category: z.enum(['room', 'other'], {
      required_error: 'Please select a category.',
    }),
    customer: z.string().optional(),
    roomNumber: z.number().int().positive().optional(),
  })
  .refine(
    (data) => {
      if (data.category === 'room') {
        return (
          data.customer &&
          data.customer.trim() !== '' &&
          (data.roomNumber === undefined ||
            (typeof data.roomNumber === 'number' && data.roomNumber > 0))
        );
      }
      return true;
    },
    {
      message:
        'Customer is required and Room Number (if provided) must be a positive integer when category is Room',
      path: ['customer', 'roomNumber'],
    }
  );
export default checkOutFormSchema;
