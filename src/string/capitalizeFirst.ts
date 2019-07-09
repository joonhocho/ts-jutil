export const capitalizeFirst = (s: string): string => {
  if (s) {
    return s[0].toUpperCase() + s.substring(1);
  }
  return '';
};
