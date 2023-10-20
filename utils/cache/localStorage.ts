import { ERROR_MESSAGE } from "@/consts";
import { isServer } from "@/utils";

class LocalStorage {
  get(key: string) {
    if (isServer()) {
      throw new Error(ERROR_MESSAGE.SERVER_RENDER_RENDER);
    }

    const value = localStorage.getItem(key);

    if (!value) {
      throw new Error(ERROR_MESSAGE.NO_CACHED_VALUE_LOCAL_STORAGE);
    }

    return JSON.parse(value);
  }

  set<T extends object | string>(key: string, value: T) {
    if (isServer()) {
      throw new Error(ERROR_MESSAGE.SERVER_RENDER_RENDER);
    }

    const valueStrToCache =
      typeof value !== "string" ? JSON.stringify(value) : value;

    localStorage.setItem(key, valueStrToCache);
  }

  remove(key: string) {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.removeItem(key);
  }
}

export default LocalStorage;
