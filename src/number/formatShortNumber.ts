const defaultSuffixes = ['', 'K', 'M', 'B'];

export const formatShortNumber = (
  n: number,
  {
    divisor = 1000,
    units = defaultSuffixes,
    precision = 2,
    round = 'round',
  }: {
    divisor?: number;
    units?: string[];
    precision?: number;
    round?: 'round' | 'floor' | 'ceil';
  } = {}
): string => {
  const sign = n >= 0 ? '' : '-';
  let abs = Math.abs(n);
  const len = units.length;
  for (let i = 0; i < len; i += 1) {
    if (abs < divisor || i >= len - 1) {
      const sigN = `${abs}`.replace(/\..*$/, '').length;
      const p = Math.max(0, precision - sigN);
      const ns = i === 0 ? abs : abs.toFixed(p);
      return `${sign}${ns}${units[i]}`;
    }
    const pp = Math.pow(10, Math.max(0, precision - 1));
    abs = Math[round]((abs * pp) / divisor) / pp;
  }
  return `${sign}${abs}${units[len - 1]}`;
};
