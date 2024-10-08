export const employeeStatusOptionList = [
  'actif',
  'inactif',
  'en_vacances',
  'démissionné',
  'licencié',
  'en_attente',
] as const;
type EmployeeStatusOption = (typeof employeeStatusOptionList)[number];
export default EmployeeStatusOption;
