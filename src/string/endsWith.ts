export const endsWith = (str: string, suffix: string): boolean =>
  str.indexOf(suffix, str.length - suffix.length) !== -1;
