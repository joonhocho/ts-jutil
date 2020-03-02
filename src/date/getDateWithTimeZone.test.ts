import { getDateWithTimeZone } from './getDateWithTimeZone';

const LA = 'America/Los_Angeles';
const London = 'Europe/London';
const Seoul = 'Asia/Seoul';
const Auckland = 'Pacific/Auckland';

test('getDateWithTimeZone', () => {
  const date = getDateWithTimeZone(LA, 2020, 2, 2, 13, 23, 45);
  expect(date.toLocaleString('en-US', { timeZone: LA })).toBe(
    '3/2/2020, 1:23:45 PM'
  );

  expect(date.toLocaleString('en-US', { timeZone: London })).toBe(
    '3/2/2020, 9:23:45 PM'
  );

  expect(date.toLocaleString('en-US', { timeZone: Seoul })).toBe(
    '3/3/2020, 6:23:45 AM'
  );

  expect(date.toLocaleString('en-US', { timeZone: Auckland })).toBe(
    '3/3/2020, 10:23:45 AM'
  );
});
