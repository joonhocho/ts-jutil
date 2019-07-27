export const omit = <T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const dest = { ...obj };
  for (let i = 0, len = keys.length; i < len; i += 1) {
    delete dest[keys[i]];
  }
  return dest;
};
