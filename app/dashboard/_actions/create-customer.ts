'use server';

import { IdOption } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import createCustomerSchema from '../_schema/create-client-form-schema';
import { CreateCustomerFormData } from '../_types/create-client-form-data';
import prisma from '@/prisma/client';

export async function createCustomer(data: CreateCustomerFormData) {
  const result = createCustomerSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: true,
      message: result.error.errors.map((err) => err.message).join(', '),
    };
  }

  try {
    const existingEmail = await prisma.customer.findUnique({
      where: { email: result.data.email },
    });
    if (existingEmail) {
      return {
        success: false,
        errors: true,
        message: 'Cet e-mail est déjà utilisé',
      };
    }
    const existingPhone = await prisma.customer.findUnique({
      where: { phoneNumber: result.data.phoneNumber },
    });
    if (existingPhone) {
      return {
        success: false,
        errors: true,
        message: 'Le numéro de téléphone existe déjà.',
      };
    }
    const newCustomer = await prisma.customer.create({
      data: {
        firstName: result.data.firstName,
        lastName: result.data.lastName,
        email: result.data.email,
        phoneNumber: result.data.phoneNumber,
        idType: result.data.idType as IdOption,
        idNumber: result.data.idNumber,
      },
    });
    revalidatePath('/dashboard/customers');
    revalidatePath('/dashboard/sales/checkout');
    return { success: true, data: newCustomer };
  } catch (error) {
    return {
      success: false,
      errors: true,
      message: `Une erreur s'est produite lors de la création : ${
        error instanceof Error ? error.message : error
      }`,
    };
  }
}
