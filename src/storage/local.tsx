export const get = (key: string): string | null => {
  return window.localStorage.getItem(key);
}

export const set = (key: string, data: string) => {
  window.localStorage.setItem(key, data);
}