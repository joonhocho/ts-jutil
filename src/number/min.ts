export const min = (ns: number[]): number | null => {
  const len = ns.length;
  if (len === 0) {
    return null;
  }
  let m = Number.MAX_VALUE;
  for (let i = 0; i < len; i += 1) {
    const n = ns[i];
    if (n < m) {
      m = n;
    }
  }
  return m;
};
