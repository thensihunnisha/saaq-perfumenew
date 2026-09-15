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

const WISHLIST_STORAGE_KEY = "saaq-wishlist";
const EMPTY_WISHLIST: Product[] = [];

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

let memoryItems: Product[] = EMPTY_WISHLIST;
let memoryRaw: string | null = null;
let canReadClientWishlist = false;
const listeners = new Set<() => void>();

function parseWishlist(raw: string | null): Product[] {
  if (!raw) {
    return EMPTY_WISHLIST;
  }

  try {
    const parsed = JSON.parse(raw) as Product[];
    return Array.isArray(parsed) ? parsed : EMPTY_WISHLIST;
  } catch {
    return EMPTY_WISHLIST;
  }
}

function emitWishlist() {
  listeners.forEach((listener) => listener());
}

function readWishlistFromStorage(): Product[] {
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);

    if (raw === memoryRaw) {
      return memoryItems;
    }

    memoryRaw = raw;
    memoryItems = parseWishlist(raw);
    return memoryItems;
  } catch {
    return memoryItems;
  }
}

function subscribeToWishlist(listener: () => void) {
  listeners.add(listener);

  const onStorage = (event: StorageEvent) => {
    if (event.key === WISHLIST_STORAGE_KEY || event.key === null) {
      memoryRaw = null;
      readWishlistFromStorage();
      listener();
    }
  };

  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getWishlistSnapshot(): Product[] {
  return canReadClientWishlist ? memoryItems : EMPTY_WISHLIST;
}

function getWishlistServerSnapshot(): Product[] {
  return EMPTY_WISHLIST;
}

function writeWishlist(next: Product[]) {
  memoryItems = next.length === 0 ? EMPTY_WISHLIST : next;
  memoryRaw = JSON.stringify(memoryItems);

  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, memoryRaw);
  } catch {
    // Private browsing or full storage should not break the wishlist in memory.
  }

  emitWishlist();
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const storedItems = useSyncExternalStore(
    subscribeToWishlist,
    getWishlistSnapshot,
    getWishlistServerSnapshot
  );
  const [isReady, setIsReady] = useState(false);
  const items = isReady ? storedItems : EMPTY_WISHLIST;

  useEffect(() => {
    readWishlistFromStorage();
    canReadClientWishlist = true;
    setIsReady(true);
    emitWishlist();
  }, []);

  const isSaved = useCallback(
    (id: string) => items.some((item) => item.id === id),
    [items]
  );

  const toggleItem = useCallback((product: Product) => {
    const current = readWishlistFromStorage();
    const exists = current.some((item) => item.id === product.id);
    writeWishlist(
      exists
        ? current.filter((item) => item.id !== product.id)
        : [...current, product]
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    writeWishlist(readWishlistFromStorage().filter((item) => item.id !== id));
  }, []);

  const clearWishlist = useCallback(() => {
    writeWishlist(EMPTY_WISHLIST);
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
