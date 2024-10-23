'use server';

import prisma from '@/prisma/client';
import SaleReference from '../_libs/order-reference';
import { Discount, PaymentMethod, SalesType } from '@prisma/client';

export type SaleData = {
  cashier: string;
  salesType: SalesType;
  paymentMethod: PaymentMethod;
  subTotal: number;
  amountReceived: number;
  customerChange: number;
  discountType?: Discount;
  discountValue?: number;
  total: number;
  tax?: number;
  saleItems: { productId: string; quantity: number; price: number }[]; // Sale items
};

const createSale = async (data: SaleData) => {
  try {
    const reference = await SaleReference();

    // Create the sale record
    const newSale = await prisma.sale.create({
      data: {
        reference: reference!,
        cashier: data.cashier,
        salesType: data.salesType,
        paymentMethod: data.paymentMethod,
        amountReceived: data.amountReceived,
        customerChange: data.customerChange,
        discountType: data.discountType,
        discountValue: data.discountValue,
        tax: data.tax,
        subTotal: data.subTotal,
        total: data.total,
        SaleItem: {
          create: data.saleItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.price,
            totalPrice: item.price * item.quantity,
          })),
        },
      },
      include: {
        SaleItem: true, // Include related sale items in the response
      },
    });

    return { success: true, data: newSale }; // Return the new sale with the related items
  } catch (error) {
    return { success: false, error: 'error' }; // Handle errors
  }
};

export default createSale;
