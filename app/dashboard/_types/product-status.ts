export const ProductStatusList = ['active', 'draf', 'archieved'] as const;
type ProductStatusOptions = (typeof ProductStatusList)[number];
export default ProductStatusOptions;
