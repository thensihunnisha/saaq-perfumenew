"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/data/products";

const CART_STORAGE_KEY = "saaq-cart";

export type CartItem = {
  id: string;
  name: string;
  collection: string;
  category: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  isReady: boolean;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (
    product: Product,
    quantity?: number,
    options?: { openDrawer?: boolean }
  ) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function readCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored) as CartItem[];
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map((item) => ({
      ...item,
      category: item.category || item.collection,
    }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setItems(readCart());
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Private browsing or full storage should not break the bag in memory.
    }
  }, [items, isReady]);

  const addItem = useCallback(
    (
      product: Product,
      quantity = 1,
      options?: { openDrawer?: boolean }
    ) => {
      setItems((current) => {
        const existing = current.find((item) => item.id === product.id);

        if (existing) {
          return current.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }

        return [
          ...current,
          {
            id: product.id,
            name: product.name,
            collection: product.collection,
            category: product.category,
            price: product.price,
            image: product.image,
            description: product.description,
            quantity,
          },
        ];
      });

      if (options?.openDrawer !== false) {
        setIsDrawerOpen(true);
      }
    },
    []
  );

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((current) =>
      quantity <= 0
        ? current.filter((item) => item.id !== id)
        : current.map((item) =>
            item.id === id ? { ...item, quantity } : item
          )
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount: items.reduce((total, item) => total + item.quantity, 0),
      isReady,
      isDrawerOpen,
      openDrawer: () => setIsDrawerOpen(true),
      closeDrawer: () => setIsDrawerOpen(false),
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [addItem, clearCart, isDrawerOpen, isReady, items, removeItem, updateQuantity]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
