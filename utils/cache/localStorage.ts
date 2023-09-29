class LocalStorage {
  get(key: string) {
    const item = localStorage.getItem(key);

    return JSON.parse(item ?? "null");
  }

  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}

export default LocalStorage;
