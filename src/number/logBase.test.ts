import { logBase } from './logBase';

test('logBase', () => {
  expect(logBase(1, 2)).toBeCloseTo(Math.log2(1));
  expect(logBase(2, 2)).toBeCloseTo(Math.log2(2));
  expect(logBase(3, 2)).toBeCloseTo(Math.log2(3));
  expect(logBase(1, 10)).toBeCloseTo(Math.log10(1));
  expect(logBase(2, 10)).toBeCloseTo(Math.log10(2));
  expect(logBase(3, 10)).toBeCloseTo(Math.log10(3));
});
