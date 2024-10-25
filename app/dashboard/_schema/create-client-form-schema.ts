import { z } from 'zod';
import identificationCardOtions from '../_libs/Identification-option';

const createCustomerSchema = z.object({
  firstName: z
    .string({ required_error: 'le prénom est obligatoire' })
    .min(3, { message: 'le prénom doit comporter au moins 3 caractères' })
    .max(50, {
      message: 'le prénom ne peut pas contenir plus de 50 caractères',
    }),
  lastName: z
    .string({ required_error: 'le nom de famille est obligatoire' })
    .min(3, {
      message: 'le nom de famille doit contenir au moins 3 caractères',
    })
    .max(50, {
      message: 'le nom de famille ne peut pas contenir plus de 50 caractères',
    }),
  phoneNumber: z
    .string({ required_error: 'Le numéro de téléphone est requis' })
    .min(8, { message: 'Numéro de téléphone invalide' })
    .max(20, { message: 'Numéro de téléphone invalide' }),
  email: z.string({ required_error: 'Email is required' }).email(),
  idType: z.enum(
    identificationCardOtions.map((id) => id.value) as [string, ...string[]],
    {
      errorMap: () => ({
        message: `Le type d'ID doit être l'une des valeurs fournies`,
      }),
    }
  ),
  idNumber: z
    .string({
      required_error: `Le numéro d'identification est requis`,
    })
    .min(6, { message: 'Invalid' }),
});
export default createCustomerSchema;
