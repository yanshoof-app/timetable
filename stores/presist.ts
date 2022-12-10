import { ProxyPersistStorageEngine } from "valtio-persist";


export const localStoragePersist: ProxyPersistStorageEngine = {
  getItem: name => window.localStorage.getItem(name),
  setItem: (name, value) => window.localStorage.setItem(name, value),
  removeItem: name => window.localStorage.removeItem(name),
  getAllKeys: () => Object.keys(window.localStorage)
}