"use client";

type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

const noopStorage: StorageLike = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {}
};

export const STORAGE_PREFIX = "billionaire-timer";

export const buildStorageKey = (key: string) => `${STORAGE_PREFIX}:${key}`;

export const getClientStorage = (): StorageLike =>
  typeof window === "undefined" ? noopStorage : window.localStorage;

export function readCache<T>(key: string, fallback: T): T {
  const storage = getClientStorage();
  const raw = storage.getItem(buildStorageKey(key));
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeCache<T>(key: string, value: T) {
  const storage = getClientStorage();
  storage.setItem(buildStorageKey(key), JSON.stringify(value));
}

export function removeCache(key: string) {
  const storage = getClientStorage();
  storage.removeItem(buildStorageKey(key));
}
