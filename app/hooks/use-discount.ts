import { Discount } from '@prisma/client';
import { create } from 'zustand';

interface DiscountState {
  discountType: Discount | undefined;
  setDiscountType: (type: Discount | undefined) => void;
  discountValue: number | undefined;
  setDiscountValue: (value: number | undefined) => void;
  calculateDiscount: (subtotal: number) => number;
  resetDiscount: () => void;
}

const useDiscount = create<DiscountState>((set, get) => ({
  discountType: undefined,
  setDiscountType: (type) => set({ discountType: type }),
  discountValue: undefined,
  setDiscountValue: (value) => set({ discountValue: value }),
  calculateDiscount: (subtotal) => {
    const { discountType, discountValue } = get();
    if (!discountValue) return 0;
    const value = discountValue;
    if (isNaN(value)) return 0;
    return discountType === 'PERCENTAGE' ? (subtotal * value) / 100 : value;
  },
  resetDiscount: () => {
    set({ discountType: undefined, discountValue: undefined });
  },
}));

export default useDiscount;
