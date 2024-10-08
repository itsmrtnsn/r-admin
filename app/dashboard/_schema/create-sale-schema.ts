import { z } from 'zod';
import { paymentOptionList } from '../_types/payment-option';

const createSaleSchema = z.object({
  reference: z
    .string({ required_error: 'La référence de la commande est requise' })
    .min(10, { message: 'Le champ est requis' })
    .max(12, { message: 'Le champ est requis' }),
  cashierId: z.string({ required_error: 'le caissier ID est requis' }),
  paymentMethod: z.enum(paymentOptionList, {
    errorMap: () => ({
      message: 'Veuillez sélectionner un mode de paiement valide',
    }),
  }),
  amountReceived: z.number({ required_error: 'Le montant reçu est requis' }),
  change: z.number({ required_error: 'Le montant reçu est requis' }),
});

export default createSaleSchema;
