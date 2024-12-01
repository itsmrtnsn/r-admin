'use server';

import prisma from '@/prisma/client';

const getProductInfo = async (productId: string) => {
  const costPrice = await prisma.product.findUnique({
    where: { id: productId },
    select: { costPrice: true, price: true },
  });


  const unitGrossProfit =  await prisma.product.aggregate({
    _sum()
  })
};
