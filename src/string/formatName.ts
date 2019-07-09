const formatNamePart = (s: string): string => {
  if (s) {
    return s[0].toUpperCase() + s.substring(1).toLowerCase();
  }
  return '';
};

const allWS = /\s+/g;

export const formatName = (s: string): string => {
  if (s) {
    return s
      .trim()
      .split(allWS)
      .map(formatNamePart)
      .join(' ');
  }
  return '';
};
