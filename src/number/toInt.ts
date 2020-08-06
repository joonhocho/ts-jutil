export const toInt = (
  s: string | number | null | undefined,
  radix = 10
): number | null => {
  if (s != null) {
    if (typeof s === 'number') return s;

    try {
      const v = parseInt(s, radix);
      if (v === v) return v;
    } catch (e) {
      // noop
    }
  }
  return null;
};
