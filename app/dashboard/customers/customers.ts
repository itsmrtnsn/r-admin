'use server';

import prisma from '@/prisma/client';

const getcustomers = async () => {
  try {
    const customers = await prisma.customer.findMany();
    return customers;
  } catch (error) {}
};

export default getcustomers;
