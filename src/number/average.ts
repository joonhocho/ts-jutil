export const average = (ns: number[]): number | null => {
  const len = ns.length;
  if (len === 0) {
    return null;
  }
  let sum = 0;
  for (let i = 0; i < len; i += 1) {
    sum += ns[i];
  }
  return sum / len;
};
