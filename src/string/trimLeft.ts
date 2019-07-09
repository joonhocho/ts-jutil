export const trimLeftPattern = /^[\s\uFEFF\xA0]+/g;

export const trimLeft = (str: string): string =>
  str.replace(trimLeftPattern, '');
