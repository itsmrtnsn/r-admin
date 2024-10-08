import { z } from 'zod';
import editEmployeeFormSchema from '../_schema/edit-employee-form-schema';
export type EditEmployeeFormData = z.infer<typeof editEmployeeFormSchema>;
