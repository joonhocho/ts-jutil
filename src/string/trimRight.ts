export const trimRightPattern = /[\s\uFEFF\xA0]+$/g;

export const trimRight = (str: string): string =>
  str.replace(trimRightPattern, '');
