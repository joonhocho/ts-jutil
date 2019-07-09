const unsafeChars = /[+/=]/g;

const ENC = {
  '+': '-',
  '/': '_',
  '=': '',
};

const replaceUnsafeChar = (c: string): string => ENC[c as '+' | '/' | '='];

export const base64ToUrlSafe = (base64: string): string =>
  base64.replace(unsafeChars, replaceUnsafeChar);
