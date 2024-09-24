export type InventoryStatus = 'in_stock' | 'out_of_stock' | 'low_stock';
export type ProductStatus = 'draft' | 'published' | 'archived';
export type Product = {
  id: string;
  name: string;
  status: InventoryStatus;
  price: number;
  totalSales: number;
  category: string;
};
