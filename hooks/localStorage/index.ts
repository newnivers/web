import { useCallback, useState } from "react";
import type { ErrorMessage } from "@/consts";
import { LocalStorage } from "@/utils/cache";

function useLocalStorage<T = any>(key: string, initialValue: T) {
  const [cachedValue, setCachedValue] = useState<T>(() => {
    try {
      const localStorage = new LocalStorage();
      const value = localStorage.get(key);

      return value;
    } catch (error: unknown) {
      console.error((error as { message: ErrorMessage }).message);

      return initialValue;
    }
  });

  const setValue = useCallback(
    (entry: T) => {
      try {
        const valueToCache =
          typeof entry === "function" ? entry(cachedValue) : entry;

        setCachedValue(valueToCache);
      } catch (error: unknown) {
        console.error((error as { message: ErrorMessage }).message);
      }
    },
    [cachedValue]
  );

  return [cachedValue, setValue] as const;
}

export default useLocalStorage;
