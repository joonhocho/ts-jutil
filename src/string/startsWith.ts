export const startsWith = (str: string, prefix: string): boolean =>
  str.lastIndexOf(prefix, 0) === 0;
