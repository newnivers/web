class LocalStorage {
  get(key: string) {
    const item = localStorage.getItem(key);

    return JSON.parse(item ?? "null");
  }

  set<T extends object | string>(key: string, value: T) {
    const targetValue =
      typeof value === "object" ? JSON.stringify(value) : value;

    if (typeof targetValue !== "string") {
      return;
    }

    localStorage.setItem(key, targetValue);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}

export default LocalStorage;
