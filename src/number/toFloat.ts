export const toFloat = (
  s: string | number | null | undefined
): number | null => {
  if (s != null) {
    if (typeof s === 'number') return s;

    try {
      const v = parseFloat(s);
      if (v === v) return v;
    } catch (e) {
      // noop
    }
  }
  return null;
};
