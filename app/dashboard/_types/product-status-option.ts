export const productStatusOptionList = [
  'brouillon',
  'publié',
  'archivé',
] as const;
type ProductStatusOption = (typeof productStatusOptionList)[number];
export default ProductStatusOption;
