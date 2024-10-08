export const genderOptionList = ['homme', 'femme'] as const;
type GenderOption = (typeof genderOptionList)[number];
export default GenderOption;
