'use server';

import { EmployeeFormData, employeeSchema } from './employee-schema';

export async function registerEmployee(data: EmployeeFormData) {
  const result = employeeSchema.safeParse(data);

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  // Simulate API call or database operation
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // In a real application, you would save the data to your database here
  console.log('Employee registered:', result.data);

  return { success: true, data: result.data };
}
