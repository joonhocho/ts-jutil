import { getDateNumbersInTimeZone } from './getDateNumbersInTimeZone';

const LA = 'America/Los_Angeles';
const London = 'Europe/London';
const Seoul = 'Asia/Seoul';
const Auckland = 'Pacific/Auckland';

test('getDateNumbersInTimeZone', () => {
  const date = new Date(Date.UTC(2020, 2, 2, 13, 23, 45));

  expect(getDateNumbersInTimeZone(date, LA)).toEqual({
    year: 2020,
    month0: 2,
    date: 2,
    hours: 5,
    minutes: 23,
    seconds: 45,
  });

  expect(getDateNumbersInTimeZone(date, London)).toEqual({
    year: 2020,
    month0: 2,
    date: 2,
    hours: 13,
    minutes: 23,
    seconds: 45,
  });

  expect(getDateNumbersInTimeZone(date, Seoul)).toEqual({
    year: 2020,
    month0: 2,
    date: 2,
    hours: 22,
    minutes: 23,
    seconds: 45,
  });

  expect(getDateNumbersInTimeZone(date, Auckland)).toEqual({
    year: 2020,
    month0: 2,
    date: 3,
    hours: 2,
    minutes: 23,
    seconds: 45,
  });
});
