import { pad } from './pad';

export const padStart = ''.padStart
  ? (s: string, length: number, padString = ' '): string =>
      s.padStart(length, padString)
  : (s: string, length: number, padString = ' '): string => {
      const dLength = length - s.length;
      if (dLength > 0) {
        return `${pad(padString, dLength)}${s}`;
      }
      return s;
    };
