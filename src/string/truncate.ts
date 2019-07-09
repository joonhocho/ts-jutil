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
