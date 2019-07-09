export const pick = <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  const dest = {} as Pick<T, K>;
  for (let i = 0, len = keys.length; i < len; i += 1) {
    const key = keys[i];
    if (key in obj) {
      dest[key] = obj[key];
    }
  }
  return dest;
};
