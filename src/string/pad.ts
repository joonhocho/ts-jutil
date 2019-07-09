import { repeatString } from './repeatString';

export const pad = (padString: string, targetLength: number): string =>
  padString.length === targetLength
    ? padString
    : repeatString(
        padString,
        Math.ceil(targetLength / padString.length)
      ).substring(0, targetLength);
