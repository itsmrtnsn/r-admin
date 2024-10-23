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
};

const createSale = async (data: SaleData) => {
  try {
    const reference = await SaleReference();
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
      },
    });
    return { success: true, data: newSale }; // Add success result
  } catch (error) {
    return { success: false, error: 'error' }; // Handle error
  }
};

export default createSale;
