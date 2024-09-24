'use server';

import { InventoryStatus } from '../../types/product';

const products = [
  {
    id: '1',
    name: 'Laser Lemonade Machine',
    status: 'out_of_stock',
    price: 499.99,
    totalSales: 25,
    category: 'Beverages',
  },
  {
    id: '2',
    name: 'Hypernova Headphones',
    status: 'in_stock',
    price: 129.99,
    totalSales: 100,
    category: 'Electronics',
  },
  // {
  //   id: '3',
  //   name: 'AeroGlow Desk Lamp',
  //   status: 'low_stock',
  //   price: 39.99,
  //   totalSales: 50,
  //   category: 'Home & Office',
  // },
  // {
  //   id: 4,
  //   name: 'TechTonic Energy Drink',
  //   status: 'in_stock',
  //   price: 2.99,
  //   totalSales: 0,
  //   category: 'Beverages',
  // },
  {
    id: '5',
    name: 'Gamer Gear Pro Controller',
    status: 'low_stock',
    price: 59.99,
    totalSales: 75,
    category: 'Gaming',
  },
  {
    id: '6',
    name: 'Luminous VR Headset',
    status: 'in_stock',
    price: 199.99,
    totalSales: 30,
    category: 'Electronics',
  },
  {
    id: '7',
    name: 'AeroGlow Desk Lamp',
    status: 'out_of_stock',
    price: 39.99,
    totalSales: 50,
    category: 'Home & Office',
  },
];
export const getProducts = async (status?: InventoryStatus | 'all') => {
  if (status === 'all' || !status) {
    return products;
  }
  return products.filter((product) => product.status === status);
};
