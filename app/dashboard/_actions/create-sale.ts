'use server';

import prisma from '@/prisma/client';
import SaleReference from '../_libs/order-reference';
import { PaymentMethod, SalesType } from '@prisma/client';

export type SaleData = {
  cashier: string;
  salesType: SalesType;
  paymentMethod: PaymentMethod;
  saleAmount: number;
  amountReceived: number;
  customerChange: number;
};

const createSale = async (data: SaleData) => {
  try {
    const reference = await SaleReference();
    const newSale = await prisma.sale.create({
      data: {
        reference: reference!,
        cashier: data.cashier,
        paymentMethod: data.paymentMethod,
        saleAmount: data.saleAmount,
        amountReceived: data.amountReceived,
        customerChange: data.customerChange,
      },
    });
    return { success: true, data: newSale }; // Add success result
  } catch (error) {
    return { success: false, error: 'error' }; // Handle error
  }
};

export default createSale;
