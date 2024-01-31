export class LocalStorage {
  get(key: string) {
    return localStorage.getItem(key);
  }

  set<T extends object | string>(key: string, value: T) {
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
