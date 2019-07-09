const words = /(?:^|\s)[a-z]/g;

const toUpperCase = (s: string): string => s.toUpperCase();

export const capitalizeWords = (s: string): string => {
  if (s) {
    return s.replace(words, toUpperCase);
  }
  return '';
};
