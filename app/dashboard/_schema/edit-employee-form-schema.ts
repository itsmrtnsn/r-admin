import { z } from 'zod';
import DayOffOption, { dayOffOptionList } from '../_types/day-off-option';
import { employeeStatusOptionList } from '../_types/employee-status-option';

const editEmployeeFormSchema = z.object({
  employeeId: z.string({
    required_error: "Le ID de l'employé est requis",
    invalid_type_error: "Le ID de l'employé doit être une chaîne de caractères",
  }),
  email: z.string().email({
    message: "L'email de l'employé doit être un email valide",
  }),
  phone: z.string().regex(/^\+509 \d{4}-\d{4}$/, {
    message: 'Le numéro de téléphone doit être au format +509 3930-9079',
  }),
  position: z
    .string()
    .min(5, {
      message: "Le poste de l'employé doit contenir au moins 5 caractères",
    })
    .max(100, {
      message: "Le poste de l'employé doit contenir au plus 100 caractères",
    }),
  shiftStart: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Format de temps invalide'),
  shiftEnd: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Format de temps invalide'),
  dayOff: z
    .string()
    .nullable() // Allow null values
    .optional() // Allow undefined values
    .refine(
      (dayOff) => {
        if (dayOff === null) return true; // Accept null
        const validDaysOff = [...dayOffOptionList];
        return validDaysOff.includes(dayOff as DayOffOption); // Check against valid days
      },
      {
        message:
          'Le jour de congé doit être un jour valide (lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche)',
      }
    ),

  status: z.enum(employeeStatusOptionList, {
    errorMap: () => ({
      message:
        "Le statut de l'employé doit être un statut valide (actif, inactif, en vacances, démissionné, licencié, en attente)",
    }),
  }),
});

export default editEmployeeFormSchema;
