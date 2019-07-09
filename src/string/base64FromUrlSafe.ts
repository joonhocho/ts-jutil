const safeChars = /[-_]/g;

const DEC = {
  '-': '+',
  _: '/',
};

const replaceSafeChar = (c: string): string => DEC[c as '-' | '_'];

export const base64FromUrlSafe = (safe: string): string => {
  let base64 = safe.replace(safeChars, replaceSafeChar);
  const len = base64.length % 4;
  if (len === 2) {
    base64 += '==';
  } else if (len === 3) {
    base64 += '=';
  }
  return base64;
};
