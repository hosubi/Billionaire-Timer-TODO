"use client";

import { useCallback } from "react";
import { buildStorageKey, getClientStorage, readCache, removeCache, writeCache } from "@/lib/storage";

type UseBrowserCacheReturn = {
  load: <T>(key: string, fallback: T) => T;
  save: <T>(key: string, value: T) => void;
  clear: (key: string) => void;
  key: (name: string) => string;
};

export function useBrowserCache(): UseBrowserCacheReturn {
  const load = useCallback(<T,>(key: string, fallback: T) => readCache<T>(key, fallback), []);

  const save = useCallback(<T,>(key: string, value: T) => {
    writeCache(key, value);
  }, []);

  const clear = useCallback((key: string) => {
    removeCache(key);
  }, []);

  const key = useCallback((name: string) => buildStorageKey(name), []);

  return { load, save, clear, key };
}

export const browserStorage = getClientStorage;
