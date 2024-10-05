'use server';

import { z } from 'zod';

export const employeeSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  department: z.enum(['engineering', 'marketing', 'sales', 'hr', 'finance']),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format',
  }),
  shiftStart: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format'),
  shiftEnd: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format'),
  dayOff: z.enum([
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ]),
  gender: z.enum(['male', 'female', 'other']),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;

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
