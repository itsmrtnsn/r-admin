'use server';

import prisma from '@/prisma/client';

const getProductDetailSummary = async (productId: string) => {
  try {
    // Fetch the product to get the cost price and check existence
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { quantityInStock: true, costPrice: true },
    });

    if (!product) {
      throw new Error(`Product with ID ${productId} not found.`);
    }

    // Get total quantity sold and all sale items for the product
    const quantitySold = await prisma.saleItem.aggregate({
      _sum: { quantity: true },
      where: { productId },
    });

    const sales = await prisma.saleItem.findMany({
      where: { productId },
      select: {
        quantity: true,
        sellingPrice: true,
      },
    });

    // Calculate total revenue and average selling price
    const totalRevenue = sales.reduce(
      (acc, sale) => acc + sale.quantity * sale.sellingPrice,
      0
    );

    return {
      quantitySold: quantitySold._sum.quantity || 0,
      totalRevenue,
      currentStockValue: product.quantityInStock,
    };
  } catch (error) {
    console.error('Error fetching product summary:', error);
    return null;
  }
};

export default getProductDetailSummary;
