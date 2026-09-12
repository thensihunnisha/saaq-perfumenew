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

const WISHLIST_STORAGE_KEY = "saaq-wishlist";

type WishlistContextValue = {
  items: Product[];
  itemCount: number;
  isReady: boolean;
  isSaved: (id: string) => boolean;
  toggleItem: (product: Product) => void;
  removeItem: (id: string) => void;
  clearWishlist: () => void;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

function readWishlist(): Product[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored) as Product[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setItems(readWishlist());
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Private browsing or full storage should not break the wishlist in memory.
    }
  }, [items, isReady]);

  const isSaved = useCallback(
    (id: string) => items.some((item) => item.id === id),
    [items]
  );

  const toggleItem = useCallback((product: Product) => {
    setItems((current) => {
      const exists = current.some((item) => item.id === product.id);
      return exists
        ? current.filter((item) => item.id !== product.id)
        : [...current, product];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const clearWishlist = useCallback(() => {
    setItems([]);
  }, []);

  const value = useMemo<WishlistContextValue>(
    () => ({
      items,
      itemCount: items.length,
      isReady,
      isSaved,
      toggleItem,
      removeItem,
      clearWishlist,
    }),
    [clearWishlist, isReady, isSaved, items, removeItem, toggleItem]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }

  return context;
}
