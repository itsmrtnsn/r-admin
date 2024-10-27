'use server';

import prisma from '@/prisma/client';
import { Discount, PaymentMethod, Prisma } from '@prisma/client';
import SaleReference from '../_libs/order-reference';

export type SaleData = {
  cashier: string;
  paymentMethod: PaymentMethod;
  subTotal: number;
  amountReceived: number;
  customerChange: number;
  discountType?: Discount;
  discountValue?: number;
  total: number;
  tax?: number;
};

export type SaleItemsData = {
  productId: string;
  unitPrice: number;
  quantity: number;
  sellingPrice: number;
  totalCost: number;
};

const createSale = async (
  saleData: SaleData,
  saleItemsData: SaleItemsData[]
) => {
  try {
    // Validate saleData and saleItemsData (this is a placeholder, implement validation logic here)
    if (!saleData || !saleItemsData || saleItemsData.length === 0) {
      throw new Error(
        `Données de vente ou données d'articles soldés non valides`
      );
    }

    // Generate sale reference
    const reference = await SaleReference();

    // Start a transaction for creating sale and saleItems
    const newSale = await prisma.sale.create({
      data: {
        reference: reference!,
        cashier: saleData.cashier,
        paymentMethod: saleData.paymentMethod,
        amountReceived: saleData.amountReceived,
        customerChange: saleData.customerChange,
        discountType: saleData.discountType || null,
        discountValue: saleData.discountValue || null,
        tax: saleData.tax || 0,
        subTotal: saleData.subTotal,
        total: saleData.total,
        category: 'DRINK',
      },
    });

    // Create sale items using the correct saleId (string)
    const newSalesItems = await prisma.saleItem.createMany({
      data: saleItemsData.map((item) => ({
        saleId: newSale.id,
        productId: item.productId,
        unitPrice: item.unitPrice,
        sellingPrice: item.sellingPrice,
        totalCost: item.totalCost,
        quantity: item.quantity,
      })),
    });

    // Fetch sale items with related product information
    const saleItems = await prisma.saleItem.findMany({
      where: { saleId: newSale.id },
      include: { product: { select: { name: true } } },
    });

    return {
      success: true,
      saleData: newSale,
      saleItemData: saleItems,
      message: 'Vente créée avec succès.',
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle known Prisma errors (specific handling can be added here)
      console.error('Prisma error:', error);
    } else {
      console.error('Error occurred:', error); // Log the error details
    }

    return {
      success: false,
      message: `Une erreur s'est produite lors de la création de la vente`,
    };
  }
};

export default createSale;
