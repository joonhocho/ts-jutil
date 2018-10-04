import { isTruthy } from './is';

export const stringify = (
  obj: any,
  spacing = '  ',
  replacer: any = null
): string => JSON.stringify(obj, replacer, spacing);

export const truncate = (
  str: string,
  maxLength: number,
  suffix = ''
): string => {
  if (str.length > maxLength) {
    return str.substring(0, maxLength - suffix.length) + suffix;
  }
  return str;
};

export const ellipsis = (
  str: string,
  maxLength: number,
  suffix = '...'
): string => truncate(str, maxLength, suffix);

export const split = (list: string | string[], delimiter = ','): string[] => {
  if (!list || !list.length) return [];
  const array = typeof list === 'string' ? list.split(delimiter) : list;
  return array.filter(isTruthy);
};

export const escapeRegExpChars = (str: string): string =>
  str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

const allWS = /\s+/g;

export const collapseWSSingleLine = (s: string): string => {
  if (s) {
    const t = s.trim();
    if (t) {
      return t.replace(allWS, ' ');
    }
  }
  return '';
};

const newline = /[\r\n]/;

const replaceCollapsedWS = (s: string): string =>
  newline.test(s) ? '\n' : ' ';

export const collapseWSMultiLine = (s: string): string => {
  if (s) {
    const t = s.trim();
    if (t) {
      return t.replace(allWS, replaceCollapsedWS);
    }
  }
  return '';
};

const words = /(?:^|\s)[a-z]/g;

const toUpperCase = (s: string): string => s.toUpperCase();

export const capitalizeWords = (s: string): string => {
  if (s) {
    return s.replace(words, toUpperCase);
  }
  return '';
};

export const capitalizeFirst = (s: string): string => {
  if (s) {
    return s[0].toUpperCase() + s.substring(1);
  }
  return '';
};

export const toBase64 = (s: string): string =>
  Buffer.from(s, 'utf8').toString('base64');

export const fromBase64 = (s: string): string =>
  Buffer.from(s, 'base64').toString('utf8');
