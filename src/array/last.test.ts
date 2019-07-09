import { last } from './last';

describe('last', () => {
  test('returns the last item of an array', () => {
    expect(last([])).toBe(undefined);
    expect(last([1])).toBe(1);
    expect(last([1, 2])).toBe(2);
  });
});
