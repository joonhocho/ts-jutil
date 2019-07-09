import { getterMap } from './getterMap';

describe('getterMap', () => {
  test('should safely get a value at deep path', () => {
    const transform = getterMap({
      a: 'a1.a2.a3',
      b: 'b1.b2',
      c: 'c1',
    });

    expect(
      transform({
        a1: { a2: { a3: { a4: 1 } } },
        b1: { b2: { b3: 2 } },
        c1: { c2: 3 },
      })
    ).toEqual({
      a: { a4: 1 },
      b: { b3: 2 },
      c: { c2: 3 },
    });

    expect(
      transform({
        a1: { a2: { a3: 1 } },
        b1: { b2: 2 },
        c1: 3,
      })
    ).toEqual({
      a: 1,
      b: 2,
      c: 3,
    });

    expect(transform({})).toEqual({
      a: undefined,
      b: undefined,
      c: undefined,
    });
  });
});
