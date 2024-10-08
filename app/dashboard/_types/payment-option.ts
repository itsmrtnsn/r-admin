export const paymentOptionList = [
  'cash',
  'cheque',
  'transfer',
  'carte_de_credit',
  'paiment_mobile',
] as const;
type PaymentOption = (typeof paymentOptionList)[number];
export default PaymentOption;
