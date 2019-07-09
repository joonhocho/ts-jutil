import { isEmpty } from './isEmpty';

describe('isEmpty', () => {
  test('returns true if the given object is empty', () => {
    expect(isEmpty({})).toBe(true);
    expect(isEmpty({ a: 1 })).toBe(false);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty([1])).toBe(false);
  });
});
