import { number } from 'zod';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Discount = 'PERCENTAGE' | 'FIXED';

interface DiscountState {
  discountType: Discount | undefined;
  setDiscountType: (type: Discount | undefined) => void;
  discountValue: number | undefined; // Always the actual discount in value
  setDiscountValue: (value: number | undefined) => void;
  discountPercentage: number | 0; // Always the discount as a percentage of subtotal
  calculateDiscount: (subtotal: number) => number;
  resetDiscount: () => void;
}

const useDiscount = create<DiscountState>()(
  persist(
    (set, get) => ({
      discountType: undefined,
      setDiscountType: (type) => set({ discountType: type }),

      discountValue: undefined,
      setDiscountValue: (value) => set({ discountValue: value }),

      discountPercentage: 0, // Always holds percentage equivalent
      calculateDiscount: (subtotal) => {
        const { discountType, discountValue, discountPercentage } = get();

        if (!discountValue || isNaN(discountValue)) return 0;

        let calculatedDiscount; // Actual discount value in currency
        let percentageEquivalent; // Percentage equivalent for discountPercentage

        if (discountType === 'PERCENTAGE') {
          // For percentage, calculate the value and set discountPercentage directly from discountValue
          calculatedDiscount = (subtotal * discountValue) / 100;
          percentageEquivalent = discountValue; // Same as discountValue when type is PERCENTAGE
        } else if (discountType === 'FIXED') {
          // For fixed, set the discount value directly, and calculate percentage equivalent
          calculatedDiscount = discountValue;
          percentageEquivalent = (discountValue / subtotal) * 100; // Convert fixed to percentage
        } else {
          calculatedDiscount = 0;
          percentageEquivalent = 0;
        }

        // Only update discountPercentage if it has actually changed
        if (discountPercentage !== percentageEquivalent) {
          set({ discountPercentage: percentageEquivalent });
        }

        // Return the actual discount amount in currency
        return calculatedDiscount;
      },

      resetDiscount: () => {
        set({
          discountType: undefined,
          discountValue: undefined,
          discountPercentage: undefined,
        });
      },
    }),
    {
      name: 'discount-storage', // Unique storage name
      storage: createJSONStorage(() => localStorage), // Use localStorage
    }
  )
);

export default useDiscount;
