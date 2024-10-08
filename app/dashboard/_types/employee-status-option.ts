export const employeeStatusOptionList = [
  'actif',
  'inactif',
  'en_vacances',
  'licencie',
  'retraite',
  'en_attente',
  'demissionne',
] as const;
type EmployeeStatusOption = (typeof employeeStatusOptionList)[number];
export default EmployeeStatusOption;
