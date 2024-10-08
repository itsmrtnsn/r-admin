import { z } from 'zod';
import DayOffOption, { dayOffOptionList } from '../_types/day-off-option';
import { employeeStatusOptionList } from '../_types/employee-status-option';
import { genderOptionList } from '../_types/gender-option';

const createEmployeeSchema = z.object({
  employeeId: z
    .string()
    .min(8, {
      message: "L'identifiant de l'employé doit contenir au moins 8 caractères",
    })
    .max(8, {
      message: "L'identifiant de l'employé doit contenir au plus 8 caractères",
    }),
  firstName: z.string().min(3, {
    message: "Le prénom de l'employé doit contenir au moins 3 caractères",
  }),
  lastName: z.string().min(3, {
    message: "Le nom de l'employé doit contenir au moins 3 caractères",
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
  shiftStart: z.string().time({
    message: 'Le début de la journée de travail doit être une heure valide',
  }),
  shiftEnd: z.string().time({
    message: 'La fin de la journée de travail doit être une heure valide',
  }),
  dayOff: z
    .string()
    .optional()
    .refine(
      (dayOff) => {
        const validDaysOff = [...dayOffOptionList];
        return (
          dayOff === undefined || validDaysOff.includes(dayOff as DayOffOption)
        );
      },
      {
        message:
          'Le jour de congé doit être un jour valide (lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche)',
      }
    ),
  gender: z.enum(genderOptionList, {
    errorMap: () => ({
      message:
        "Le genre de l'employé doit être un genre valide (homme, femme, autre)",
    }),
  }),
  status: z.enum(employeeStatusOptionList, {
    errorMap: () => ({
      message:
        "Le statut de l'employé doit être un statut valide (actif, inactif, en vacances, démissionné, licencié, en attente)",
    }),
  }),
});

export default createEmployeeSchema;
