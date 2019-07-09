export const repeatString = ''.repeat
  ? (s: string, n: number): string => (n === 0 ? '' : n === 1 ? s : s.repeat(n))
  : (s: string, n: number): string =>
      n === 0 ? '' : n === 1 ? s : Array(n + 1).join(s);
