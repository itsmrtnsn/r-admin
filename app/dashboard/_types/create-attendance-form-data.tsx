import { z } from 'zod';
import createAttendanceSchema from '../_schema/attendance-form-schema';

type CreateAttendanceFormData = z.infer<typeof createAttendanceSchema>;
export default CreateAttendanceFormData;
