import { assignKeys } from './assignKeys';

describe('assignKeys', () => {
  test('copy values of the given keys', () => {
    const obj = { a: 3, b: 1, c: null, d: undefined };
    expect(assignKeys({}, obj, ['a', 'b'])).toEqual({ a: 3, b: 1 });
  });

  test('does not copy undefined values', () => {
    const obj = { a: 3, b: 1, c: null, d: undefined };

    expect(assignKeys({}, obj, Object.keys(obj))).toEqual({
      a: 3,
      b: 1,
      c: null,
    });
  });
});
