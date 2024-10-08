import { z } from 'zod';

const createSaleItemSchema = z.object({
  saleReference: z.string({
    required_error: 'La référence de la commande est requise',
  }),
  productId: z.string({ required_error: 'Le produit ID est requis' }),
  quantity: z.number({ required_error: 'La quantité est requise' }),
  unitPrice: z.number({ required_error: 'Le prix est requis' }),
  discount: z.number({ required_error: 'Le montant de la remise est requis' }),
  unitPriceAfterDiscount: z.number({
    required_error: 'Le prix unitaire après rabais est requis',
  }),
  totalPrice: z.number({ required_error: 'Le montant total est requis' }),
  totalPriceAfterDiscount: z.number({
    required_error: 'Le montant total après rabis est requis',
  }),
});

export default createSaleItemSchema;
