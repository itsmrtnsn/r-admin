import { PaymentMethod } from '@prisma/client';
import { create } from 'zustand';

type CheckOutSession = {
  paymentMethod: PaymentMethod;
  category: 'room' | 'other';
  customer: string | undefined;
  amountReceived: number;
  roomNumber: number | undefined;
  setPaymentMethod: (method: PaymentMethod) => void;
  setCategory: (category: 'room' | 'other') => void;
  setCustomer: (customer: string | undefined) => void;
  setAmountReceived: (amount: number) => void;
  setRoomNumber: (roomNumber: number | undefined) => void;
};

const useCheckOutStore = create<CheckOutSession>((set) => ({
  paymentMethod: 'cash',
  category: 'other',
  customer: undefined,
  amountReceived: 0,
  roomNumber: undefined,
  setPaymentMethod: (method) => set({ paymentMethod: method }),
  setCategory: (category) => set({ category }),
  setCustomer: (customer) => set({ customer }),
  setAmountReceived: (amount) => set({ amountReceived: amount }),
  setRoomNumber: (roomNumber) => set({ roomNumber }),
}));

export default useCheckOutStore;
