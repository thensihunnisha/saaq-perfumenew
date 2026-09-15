"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Product } from "@/data/products";

const CART_STORAGE_KEY = "saaq-cart";
const EMPTY_CART: CartItem[] = [];

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

let memoryItems: CartItem[] = EMPTY_CART;
let memoryRaw: string | null = null;
let canReadClientCart = false;
const listeners = new Set<() => void>();

function parseCart(raw: string | null): CartItem[] {
  if (!raw) {
    return EMPTY_CART;
  }

  try {
    const parsed = JSON.parse(raw) as CartItem[];

    if (!Array.isArray(parsed)) {
      return EMPTY_CART;
    }

    return parsed.map((item) => ({
      ...item,
      category: item.category || item.collection,
    }));
  } catch {
    return EMPTY_CART;
  }
}

function emitCart() {
  listeners.forEach((listener) => listener());
}

function readCartFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);

    if (raw === memoryRaw) {
      return memoryItems;
    }

    memoryRaw = raw;
    memoryItems = parseCart(raw);
    return memoryItems;
  } catch {
    return memoryItems;
  }
}

function subscribeToCart(listener: () => void) {
  listeners.add(listener);

  const onStorage = (event: StorageEvent) => {
    if (event.key === CART_STORAGE_KEY || event.key === null) {
      memoryRaw = null;
      readCartFromStorage();
      listener();
    }
  };

  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getCartSnapshot(): CartItem[] {
  return canReadClientCart ? memoryItems : EMPTY_CART;
}

function getCartServerSnapshot(): CartItem[] {
  return EMPTY_CART;
}

function writeCart(next: CartItem[]) {
  memoryItems = next.length === 0 ? EMPTY_CART : next;
  memoryRaw = JSON.stringify(memoryItems);

  try {
    localStorage.setItem(CART_STORAGE_KEY, memoryRaw);
  } catch {
    // Private browsing or full storage should not break the bag in memory.
  }

  emitCart();
}

export function CartProvider({ children }: { children: ReactNode }) {
  const storedItems = useSyncExternalStore(
    subscribeToCart,
    getCartSnapshot,
    getCartServerSnapshot
  );
  const [isReady, setIsReady] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const items = isReady ? storedItems : EMPTY_CART;

  useEffect(() => {
    readCartFromStorage();
    canReadClientCart = true;
    setIsReady(true);
    emitCart();
  }, []);

  const addItem = useCallback(
    (
      product: Product,
      quantity = 1,
      options?: { openDrawer?: boolean }
    ) => {
      const current = readCartFromStorage();
      const existing = current.find((item) => item.id === product.id);

      writeCart(
        existing
          ? current.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          : [
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
            ]
      );

      if (options?.openDrawer !== false) {
        setIsDrawerOpen(true);
      }
    },
    []
  );

  const updateQuantity = useCallback((id: string, quantity: number) => {
    const current = readCartFromStorage();
    writeCart(
      quantity <= 0
        ? current.filter((item) => item.id !== id)
        : current.map((item) =>
            item.id === id ? { ...item, quantity } : item
          )
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    writeCart(readCartFromStorage().filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    writeCart(EMPTY_CART);
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
