const nonDigitRegex = /\D+/g;

export const toDigits = (s: string): string =>
  s ? s.replace(nonDigitRegex, '') : '';
