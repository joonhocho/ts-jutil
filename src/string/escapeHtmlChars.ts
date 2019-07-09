// https://stackoverflow.com/a/5499821/692528
const htmlCharsToEscape: { [key: string]: string } = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
};

const escapeHtmlChar = (tag: string): string => htmlCharsToEscape[tag] || tag;

export const escapeHtmlChars = (str: string): string =>
  str.replace(/[&<>]/g, escapeHtmlChar);
