const nonDigitRegex = /\D+/g;

export const toDigits = (s: string): string =>
  s ? s.replace(nonDigitRegex, '') : '';

export const toTitleCase = (s: string): string => {
  return s
    .split(/[_\-\s]+/)
    .map((x) => x[0].toUpperCase() + x.substring(1).toLowerCase())
    .join(' ');
};

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

const defaultSectionSize = 3;

export const formatCurrency = (
  value: number,
  fixed = 0,
  sectionSize = defaultSectionSize,
  sign = '$'
): string => {
  const regexp = new RegExp(
    `\\d(?=(\\d{${sectionSize}})+${fixed > 0 ? '\\.' : '$'})`,
    'g'
  );
  // tslint:disable-next-line no-bitwise
  const fixed2 = Math.max(0, ~~fixed);
  return `${sign}${value.toFixed(fixed2).replace(regexp, '$&,')}`;
};
