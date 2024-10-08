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

export const gender = ['homme', 'femme'] as const;

export const employeeStatus = [
  'active',
  'inactive',
  'pending',
  'on_leave',
  'terminated',
  'fired',
  'retired',
  'resigned',
] as const;

export const employeeSchema = z.object({
  employeeId: z.string({
    required_error: "Le ID de l'employé est requis",
    invalid_type_error: "Le ID de l'employé doit être une chaîne de caractères",
  }),
  firstName: z
    .string({
      required_error: 'Le prénom est requis',
      invalid_type_error: 'Le prénom doit être une chaîne de caractères',
    })
    .min(3, 'Le prénom doit contenir au moins 3 caractères')
    .max(50, 'Le prénom doit contenir au plus 50 caractères'),
  lastName: z
    .string({
      required_error: 'Le nom est requis',
      invalid_type_error:
        'le nom de famille doit être une chaîne de caractères',
    })
    .min(3, 'Le nom doit contenir au moins 3 caractères')
    .max(50, 'Le nom doit contenir au plus 50 caractères'),
  email: z
    .string({
      required_error: "L'adresse e-mail est requise",
      invalid_type_error: 'Adresse e-mail invalide',
    })
    .email('Adresse e-mail invalide'),
  phone: z
    .string({
      required_error: 'Le numéro de téléphone est requis',
    })
    .regex(/^\+?[1-9]\d{1,14}$/, 'Numéro de téléphone invalide'),
  status: z.enum(['active', 'inactive', 'pending', 'on_leave', 'terminated'], {
    required_error: 'Le status est requis',
    invalid_type_error: 'Le status doit être une chaîne de caractères',
  }),
  position: z
    .string({
      invalid_type_error: 'le position doit être une chaîne de caractères',
      required_error: 'position est requis',
    })
    .min(5, { message: 'Le position doit contenir au moins 5 caractères' })
    .max(50, { message: 'Le nom doit contenir au plus 5 caractères' }),
  shiftStart: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Format de temps invalide'),
  shiftEnd: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Format de temps invalide'),
  dayOff: z
    .enum(dayOff)
    .optional()
    .refine((value) => value === undefined || dayOff.includes(value), {
      message:
        "Le jour de repos doit être l'un des jours suivants: " +
        dayOff.join(', '),
    }),

  gender: z.enum(gender, {
    required_error: 'Le genre est requis',
  }),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;
