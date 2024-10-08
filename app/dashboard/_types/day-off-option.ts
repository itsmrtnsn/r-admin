export const dayOffOptionList = [
  'lundi',
  'mardi',
  'mercredi',
  'jeudi',
  'vendredi',
  'samedi',
  'dimanche',
] as const;
type DayOffOption = (typeof dayOffOptionList)[number];
export default DayOffOption;
