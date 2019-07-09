import { first } from './first';

describe('first', () => {
  test('returns the first item of an array', () => {
    expect(first([])).toBe(undefined);
    expect(first([1])).toBe(1);
    expect(first([1, 2])).toBe(1);
  });
});
