'use server';

import prisma from '@/prisma/client';

const topProducts = async (startDate?: Date, endDate?: Date) => {
  try {
    const dateFilter =
      startDate || endDate
        ? {
            createdAt: {
              gte: startDate || new Date(),
              lte: endDate || new Date(),
            },
          }
        : {};

    const topProducts = await prisma.saleItem.groupBy({
      by: ['productId'],
      _sum: {
        quantity: true,
      },
      where: dateFilter,
      orderBy: {
        _sum: {
          quantity: 'desc',
        },
      },
      take: 5,
    });

    const productDetails = await Promise.all(
      topProducts.map(async (item) => {
        const [product, saleItems] = await Promise.all([
          // Fetch product details
          prisma.product.findUnique({
            where: { id: item.productId },
            select: { name: true, id: true },
          }),
          // Fetch all sale items for this product to calculate total revenue, filtered by date range
          prisma.saleItem.findMany({
            where: {
              productId: item.productId,
              ...dateFilter,
            },
            select: { quantity: true, sellingPrice: true },
          }),
        ]);

        // Calculate total revenue
        const totalRevenue = saleItems.reduce(
          (acc, sale) => acc + sale.sellingPrice * sale.quantity,
          0
        );

        return {
          id: product?.id || item.productId,
          name: product?.name || 'Unknown Product',
          totalSales: item._sum.quantity || 0,
          totalRevenue,
        };
      })
    );

    return productDetails;
  } catch (error) {
    console.error('Error fetching top-selling products:', error);
    return [];
  }
};

export default topProducts;
