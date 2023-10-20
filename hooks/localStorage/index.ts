import { useState } from "react";
import { LocalStorage } from "@/utils/cache";
import type { ErrorCandidates } from "@/consts";

const localStorage = new LocalStorage();

function useLocalStorage<T = any>(key: string, initialValue: T) {
  const [cachedValue, setCachedValue] = useState(() => {
    try {
      const value = localStorage.get(key);

      return value;
    } catch (error: unknown) {
      console.error((error as { message: ErrorCandidates }).message);

      return initialValue;
    }
  });
}

export default useLocalStorage;
