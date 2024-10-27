import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SellableProduct } from '../_actions/get-sellable-product';

export interface CartItem {
  product: SellableProduct;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: SellableProduct) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? {
                      ...item,
                      quantity: Math.max(
                        1,
                        Math.min(
                          item.quantity + 1,
                          item.product.quantityInStock
                        )
                      ),
                    }
                  : item
              ),
            };
          }
          return { items: [...state.items, { product, quantity: 1 }] };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.product.id === productId
                ? {
                    ...item,
                    quantity: Math.max(
                      0,
                      Math.min(quantity, item.product.quantityInStock)
                    ),
                  }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'cart-storage',
      storage:
        typeof window !== 'undefined'
          ? {
              getItem: (key: string) => {
                const value = window.localStorage.getItem(key);
                return value ? JSON.parse(value) : null;
              },
              setItem: (key: string, value: any) => {
                window.localStorage.setItem(key, JSON.stringify(value));
              },
              removeItem: (key: string) => {
                window.localStorage.removeItem(key);
              },
            }
          : undefined,
    }
  )
);
