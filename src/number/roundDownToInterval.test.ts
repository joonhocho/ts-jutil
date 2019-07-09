import { roundDownToInterval } from './roundDownToInterval';

test('roundDownToInterval', () => {
  expect(roundDownToInterval(100, 4)).toBe(100);
  expect(roundDownToInterval(101, 4)).toBe(100);
  expect(roundDownToInterval(102, 4)).toBe(100);
  expect(roundDownToInterval(103, 4)).toBe(100);
  expect(roundDownToInterval(104, 4)).toBe(104);

  expect(roundDownToInterval(99, 3)).toBe(99);
  expect(roundDownToInterval(100, 3)).toBe(99);
  expect(roundDownToInterval(101, 3)).toBe(99);
  expect(roundDownToInterval(102, 3)).toBe(102);
});
