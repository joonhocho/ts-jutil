import { assignDefined } from './assignDefined';
import { getKeys } from './getKeys';

describe('assignDefined', () => {
  test('copy values of the given keys', () => {
    expect(
      assignDefined({}, { a: 3, b: 1, c: null, d: undefined }, ['a', 'b'])
    ).toEqual({ a: 3, b: 1 });
  });

  test('does not copy undefined values', () => {
    const obj = { a: 3, b: 1, c: null, d: undefined };

    expect(assignDefined({}, obj, getKeys(obj))).toEqual({
      a: 3,
      b: 1,
      c: null,
    });
  });
});
