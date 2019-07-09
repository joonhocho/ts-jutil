const htmlCharsToUnescape: { [key: string]: string } = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
};

const unescapeHtmlChar = (tag: string): string =>
  htmlCharsToUnescape[tag] || tag;

export const unescapeHtmlChars = (str: string): string =>
  str.replace(/&(?:amp|lt|gt);/g, unescapeHtmlChar);
