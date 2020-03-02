import { TimeZone } from './types';

export const getDateWithTimeZone = (
  timeZone: TimeZone,
  year: number,
  month0: number,
  day: number,
  hour = 0,
  minute = 0,
  second = 0
) => {
  const date = new Date(Date.UTC(year, month0, day, hour, minute, second));

  const offset =
    new Date(date.toLocaleString('en-US', { timeZone: 'UTC' })).getTime() -
    new Date(date.toLocaleString('en-US', { timeZone })).getTime();

  return new Date(date.getTime() + offset);
};
