import { TimeZone } from './types';

const dateRegex = /^(\d+)\/(\d+)\/(\d+),\s*(\d+):(\d+):(\d+)\s*(\w+)$/;

export interface IDateNumbers {
  year: number;
  month0: number;
  date: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const getDateNumbersInTimeZone = (
  d: Date,
  timeZone: TimeZone
): IDateNumbers | null => {
  const dateStr = d.toLocaleString('en-US', { timeZone });
  const match = dateStr.match(dateRegex);
  if (match) {
    try {
      const month0 = parseInt(match[1], 10) - 1;
      const date = parseInt(match[2], 10);
      const year = parseInt(match[3], 10);
      const hours = parseInt(match[4], 10) + (match[7] === 'PM' ? 12 : 0);
      const minutes = parseInt(match[5], 10);
      const seconds = parseInt(match[6], 10);
      return { month0, date, year, hours, minutes, seconds };
    } catch (e) {
      // noop
    }
  }
  return null;
};
