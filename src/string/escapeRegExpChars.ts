const regexpCharsRegex = /[-/\\^$*+?.()|[\]{}]/g;

export const escapeRegExpChars = (str: string): string =>
  str.replace(regexpCharsRegex, '\\$&');
