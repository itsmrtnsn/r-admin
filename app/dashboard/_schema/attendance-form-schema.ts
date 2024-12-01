import { z } from 'zod';

const createAttendanceSchema = z.object({
  employeeId: z
    .string({ required_error: `L'identifiant de l'employé est requis` })
    .min(6, { message: `Cet identifiant d'employé n'est pas valide` })
    .max(10, { message: `Cet identifiant d'employé n'est pas valide` }),
});

export default createAttendanceSchema;
