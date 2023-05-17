import ls from "localstorage-slim";

const set = (k: string, v: string) => {
  if (!k || !v) return;
  return localStorage.setItem(k,v);
};

const get = (k: string) => {
  if (!k) return;
  return localStorage.getItem(k);
};

const removeItem = (k: string) => {
  if (!k) return;
  return localStorage.removeItem(k);
};

export { set, get, removeItem };
