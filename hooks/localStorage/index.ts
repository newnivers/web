import { useCallback, useState } from "react";
import type { ErrorMessage } from "@/consts";
import { isServer } from "@/utils";
import { LocalStorage } from "@/utils/cache";

function useLocalStorage<T extends string | object>(
  key: string,
  initialValue: T
) {
  const [cachedValue, setCachedValue] = useState<T>(() => {
    try {
      const localStorage = new LocalStorage();
      const value = localStorage.get(key);

      return value ? JSON.parse(value) : initialValue;
    } catch (error: unknown) {
      if (isServer()) {
        console.error((error as { message: ErrorMessage }).message);
      }

      return initialValue;
    }
  });

  const setValue = useCallback(
    (entry: T) => {
      try {
        const valueToCache =
          typeof entry === "function" ? entry(cachedValue) : entry;

        setCachedValue(valueToCache);

        const localStorage = new LocalStorage();
        localStorage.set(key, entry);
      } catch (error: unknown) {
        console.error((error as { message: ErrorMessage }).message);
      }
    },
    [cachedValue, key]
  );

  return [cachedValue, setValue] as const;
}

export default useLocalStorage;
