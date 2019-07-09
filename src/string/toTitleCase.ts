export const toTitleCase = (s: string): string => {
  return s
    .split(/[_\-\s]+/)
    .map((x) => x[0].toUpperCase() + x.substring(1).toLowerCase())
    .join(' ');
};
