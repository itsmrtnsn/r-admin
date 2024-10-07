import { AiFillCreditCard } from 'react-icons/ai';
import { FaFileAlt, FaMobile } from 'react-icons/fa';
import { FaMoneyCheckDollar } from 'react-icons/fa6';

import { IconType } from 'react-icons/lib';

type PaymentOption = {
  id: number;
  name: string;
  value: string;
  icon: IconType;
};

const paymentOptions: PaymentOption[] = [
  { id: 1, name: 'Cash', value: 'cash', icon: FaMoneyCheckDollar },
  { id: 2, name: 'Credit Card', value: 'credit_card', icon: AiFillCreditCard },
  { id: 3, name: 'Mobile Payment', value: 'mobile_payment', icon: FaMobile },
  { id: 4, name: 'Check', value: 'check', icon: FaFileAlt },
];

export default paymentOptions;
