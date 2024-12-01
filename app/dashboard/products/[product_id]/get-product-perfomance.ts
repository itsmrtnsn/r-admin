import prisma from '@/prisma/client';

const getProductPerformance = async (productId: string) => {
  try {
    // Fetch average selling price for the product
    const { _avg: { sellingPrice: averageSellingPrice = 0 } = {} } =
      await prisma.saleItem.aggregate({
        where: { productId },
        _avg: { sellingPrice: true },
      });

    // Fetch cost price for the product
    const { costPrice = 0 } =
      (await prisma.product.findUnique({
        where: { id: productId },
        select: { costPrice: true },
      })) || {};

    // Fetch total revenue across all sales
    const { _sum: { sellingPrice: totalRevenue = 0 } = {} } =
      await prisma.saleItem.aggregate({
        _sum: { sellingPrice: true },
      });

    // Fetch revenue for the specific product
    const { _sum: { sellingPrice: productRevenue = 0 } = {} } =
      await prisma.saleItem.aggregate({
        where: { productId },
        _sum: { sellingPrice: true },
      });

    // Calculate profit margin for the product
    const profitMargin =
      averageSellingPrice || 0 > 0
        ? ((averageSellingPrice! - costPrice) / averageSellingPrice! || 0) * 100
        : 0;

    // Calculate sales contribution of the product to total revenue
    const salesContribution =
      totalRevenue! > 0 ? (productRevenue! / totalRevenue!) * 100 : 0;

    // Fetch revenue data for each product to compute contributions
    const allProductsRevenue = await prisma.saleItem.groupBy({
      by: ['productId'],
      _sum: { sellingPrice: true },
    });

    // Calculate sales contribution for each product and rank
    const contributions = allProductsRevenue
      .map(({ productId, _sum: { sellingPrice } }) => ({
        productId,
        salesContribution:
          totalRevenue! > 0 ? (sellingPrice! / totalRevenue!) * 100 : 0,
      }))
      .sort((a, b) => b.salesContribution - a.salesContribution);

    const rank =
      contributions.findIndex(({ productId: id }) => id === productId) + 1;

    return { profitMargin, salesContribution, rank, averageSellingPrice };
  } catch (error) {
    console.error('Error fetching product performance data:', error);
    return { profitMargin: 0, salesContribution: 0, rank: -1 }; // Default fallback values
  }
};

export default getProductPerformance;
