import { pad } from './pad';

export const padEnd = ''.padEnd
  ? (s: string, length: number, padString = ' '): string =>
      s.padEnd(length, padString)
  : (s: string, length: number, padString = ' '): string => {
      const dLength = length - s.length;
      if (dLength > 0) {
        return `${s}${pad(padString, dLength)}`;
      }
      return s;
    };
