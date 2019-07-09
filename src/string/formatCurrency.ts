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
