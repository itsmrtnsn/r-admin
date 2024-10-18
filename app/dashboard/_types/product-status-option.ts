export const productStatusOptionList = ['archived', 'active', 'draft'] as const;
type ProductStatusOption = (typeof productStatusOptionList)[number];
export default ProductStatusOption;
