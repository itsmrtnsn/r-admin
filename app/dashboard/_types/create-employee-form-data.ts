import { z } from 'zod';
import createEmployeeSchema from '../_schema/create-employee-schema';
export type CreateEmployeeFormData = z.infer<typeof createEmployeeSchema>;
