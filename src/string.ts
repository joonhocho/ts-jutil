import { isTruthy } from './is';

export const trimPattern = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
export const trim = (str: string): string => str.replace(trimPattern, '');

export const trimLeftPattern = /^[\s\uFEFF\xA0]+/g;
export const trimLeft = (str: string): string =>
  str.replace(trimLeftPattern, '');

export const trimRightPattern = /[\s\uFEFF\xA0]+$/g;
export const trimRight = (str: string): string =>
  str.replace(trimRightPattern, '');

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

// https://stackoverflow.com/a/5499821/692528
const htmlCharsToEscape: { [key: string]: string } = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
};

const escapeHtmlChar = (tag: string): string => htmlCharsToEscape[tag] || tag;

export const escapeHtmlChars = (str: string): string =>
  str.replace(/[&<>]/g, escapeHtmlChar);

const htmlCharsToUnescape: { [key: string]: string } = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
};

const unescapeHtmlChar = (tag: string): string =>
  htmlCharsToUnescape[tag] || tag;

export const unescapeHtmlChars = (str: string): string =>
  str.replace(/&(?:amp|lt|gt);/g, unescapeHtmlChar);

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

export const repeatString = ''.repeat
  ? (s: string, n: number): string => (n === 0 ? '' : n === 1 ? s : s.repeat(n))
  : (s: string, n: number): string =>
      n === 0 ? '' : n === 1 ? s : Array(n + 1).join(s);

export const pad = (padString: string, targetLength: number): string =>
  padString.length === targetLength
    ? padString
    : repeatString(
        padString,
        Math.ceil(targetLength / padString.length)
      ).substring(0, targetLength);

export const padStart = ''.padStart
  ? (s: string, length: number, padString = ' '): string =>
      s.padStart(length, padString)
  : (s: string, length: number, padString = ' '): string => {
      const dLength = length - s.length;
      if (dLength > 0) {
        return `${pad(padString, dLength)}${s}`;
      }
      return s;
    };

export const padEnd = ''.padEnd
  ? (s: string, length: number, padString = ' '): string =>
      s.padEnd(length, padString)
  : (s: string, length: number, padString = ' '): string => {
      const dLength = length - s.length;
      if (dLength > 0) {
        return `${s}${pad(padString, dLength)}`;
      }
      return s;
    };
