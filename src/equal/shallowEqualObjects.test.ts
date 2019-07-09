import { shallowEqualObjects } from './shallowEqualObjects';

test('shallowEqualObjects', () => {
  const opts = { testKeys: true };
  expect(shallowEqualObjects({}, [], opts)).toBe(true);
  expect(shallowEqualObjects({}, {}, opts)).toBe(true);
  expect(shallowEqualObjects({ a: 1 }, { a: 1 }, opts)).toBe(true);
  expect(shallowEqualObjects({ a: 1, b: 2 }, { a: 1 }, opts)).toBe(false);
  expect(
    shallowEqualObjects({ a: 1, b: 2 }, { a: 1 }, { ...opts, keys: ['a'] })
  ).toBe(true);
  expect(
    shallowEqualObjects({ a: 1, b: 2 }, { a: 1 }, { ...opts, skipKeys: ['b'] })
  ).toBe(true);
  expect(shallowEqualObjects({ a: 1, b: undefined }, { a: 1 }, opts)).toBe(
    false
  );
  expect(
    shallowEqualObjects(
      { a: 1, b: undefined },
      { a: 1 },
      { ...opts, testKeys: false }
    )
  ).toBe(true);
  expect(
    shallowEqualObjects(
      { a: 1, b: undefined },
      { a: 2 },
      { ...opts, testKeys: false }
    )
  ).toBe(false);
  expect(shallowEqualObjects({ a: 1, b: 2 }, { a: 1, b: 2 }, opts)).toBe(true);
  expect(shallowEqualObjects({ b: 2, a: 1 }, { a: 1, b: 2 }, opts)).toBe(true);
  expect(
    shallowEqualObjects({ b: 2, a: { a: 1 } }, { a: { a: 1 }, b: 2 }, opts)
  ).toBe(false);
  expect(shallowEqualObjects({ a: 1 }, { a: 1, b: undefined }, opts)).toBe(
    false
  );
  expect(shallowEqualObjects({ a: 1 }, { a: '1' }, opts)).toBe(false);
  expect(
    shallowEqualObjects(
      { a: 1 },
      { a: '1' },
      // tslint:disable-next-line triple-equals
      { ...opts, equalValues: (a, b): boolean => a == b }
    )
  ).toBe(true);
  expect(
    shallowEqualObjects(
      { a: 1 },
      { a: '1' },
      { ...opts, equalValues: (a, b): boolean => a === b }
    )
  ).toBe(false);
  expect(
    shallowEqualObjects(
      { a: [] },
      { a: null },
      {
        ...opts,
        normalize: (x): any => (Array.isArray(x) && !x.length ? null : x),
      }
    )
  ).toBe(true);
});
