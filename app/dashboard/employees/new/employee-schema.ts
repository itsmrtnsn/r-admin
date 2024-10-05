import { z } from 'zod';
export const dayOff = [
  'lundi',
  'mardi',
  'mercredi',
  'jeudi',
  'vendredi',
  'samedi',
  'dimanche',
] as const;

export const gender = ['masculin', 'féminin'] as const;
export const employeeSchema = z.object({
  firstName: z
    .string({
      required_error: 'Le prénom est requis',
    })
    .min(2, 'Le prénom doit contenir au moins 3 caractères')
    .max(50, 'Le prénom doit contenir au plus 50 caractères'),
  lastName: z
    .string({
      required_error: 'Le nom est requis',
    })
    .min(2, 'Le nom doit contenir au moins 3 caractères')
    .max(50, 'Le nom doit contenir au plus 50 caractères'),
  email: z
    .string({
      required_error: "L'adresse e-mail est requise",
    })
    .email('Adresse e-mail invalide'),
  phone: z
    .string({
      required_error: 'Le numéro de téléphone est requis',
    })
    .regex(/^\+?[1-9]\d{1,14}$/, 'Numéro de téléphone invalide'),
  department: z.enum(['engineering', 'marketing', 'sales', 'hr', 'finance']),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Format de date invalide',
  }),
  shiftStart: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Format de temps invalide'),
  shiftEnd: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Format de temps invalide'),
  dayOff: z.enum(dayOff, {
    required_error: 'Le jour de repos est requis',
  }),

  gender: z.enum(gender, {
    required_error: 'Le genre est requis',
  }),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;
