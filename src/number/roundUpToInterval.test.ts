import { roundUpToInterval } from './roundUpToInterval';

test('roundUpToInterval', () => {
  expect(roundUpToInterval(100, 4)).toBe(100);
  expect(roundUpToInterval(101, 4)).toBe(104);
  expect(roundUpToInterval(102, 4)).toBe(104);
  expect(roundUpToInterval(103, 4)).toBe(104);
  expect(roundUpToInterval(104, 4)).toBe(104);

  expect(roundUpToInterval(99, 3)).toBe(99);
  expect(roundUpToInterval(100, 3)).toBe(102);
  expect(roundUpToInterval(101, 3)).toBe(102);
  expect(roundUpToInterval(102, 3)).toBe(102);
});
