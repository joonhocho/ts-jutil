import {
  equal,
  equalObjects,
  shallowEqualObjects,
  shallowEqualValues,
} from './equal';

describe('equalArrays', () => {
  test('deeply compares two arrays', () => {
    const opts = { testKeys: true };
    expect(equalObjects([], [], opts)).toBe(true);
    expect(equalObjects([1], [], opts)).toBe(false);
    expect(equalObjects([1], [1], opts)).toBe(true);
    expect(equalObjects([undefined], [undefined], opts)).toBe(true);
    expect(equalObjects([undefined], [], opts)).toBe(false);
    expect(equalObjects([NaN], [NaN], opts)).toBe(true);
    expect(equalObjects([NaN], [null], opts)).toBe(false);
    expect(equalObjects([null], [NaN], opts)).toBe(false);
    expect(equalObjects([1, 2], [1, 2], opts)).toBe(true);
    expect(equalObjects([1, 2], [1, '2'], opts)).toBe(false);
    expect(equalObjects([1, 2], [1, 1], opts)).toBe(false);
    expect(equalObjects([1, 2, 3], [1, 2, 2], opts)).toBe(false);
    expect(
      equalObjects([1, 2, 3], [1, 2, 2], { testKeys: true, keys: [0] })
    ).toBe(true);
    expect(
      equalObjects([1, 2, 3], [1, 2, 2], { testKeys: true, skipKeys: [2] })
    ).toBe(true);
    expect(equalObjects([1, 2, 3], [1, 2, 3], opts)).toBe(true);
    expect(
      equalObjects(
        [1, [], '', { a: 1, b: [null] }, true, null, undefined],
        [1, [], '', { a: 1, b: [null] }, true, null, undefined],
        opts
      )
    ).toBe(true);
    expect(
      equalObjects(
        [1, [], '', { a: 1, b: [null] }, true, null, undefined],
        [1, [], '', { a: 1, b: [undefined] }, true, null, undefined],
        opts
      )
    ).toBe(false);
  });
});

describe('equalObjects', () => {
  test('deeply compares two objects', () => {
    const opts = { testKeys: true };
    expect(equalObjects({}, {}, opts)).toBe(true);
    expect(equalObjects({ a: undefined }, {}, opts)).toBe(false);
    expect(equalObjects({ a: undefined }, {}, { testKeys: false })).toBe(true);
    expect(
      equalObjects({ a: undefined }, {}, { ...opts, skipKeys: ['a'] })
    ).toBe(true);
    expect(equalObjects({ a: null }, {}, opts)).toBe(false);
    expect(equalObjects({ a: null }, {}, { testKeys: false })).toBe(false);
    expect(equalObjects({ a: null }, {}, { ...opts, skipKeys: ['a'] })).toBe(
      true
    );
    expect(equalObjects({ a: null }, { a: undefined }, opts)).toBe(false);
    expect(
      equalObjects(
        { a: null },
        { a: undefined },
        // tslint:disable-next-line triple-equals
        { ...opts, equalValues: (a, b): boolean => a == b }
      )
    ).toBe(true);
    expect(
      equalObjects(
        { a: null },
        { a: undefined },
        { ...opts, equalValues: (a, b): boolean => a === b }
      )
    ).toBe(false);
    expect(equalObjects({ a: null }, { a: null, b: undefined }, opts)).toBe(
      false
    );
    expect(
      equalObjects({ a: 1, b: [{ c: true }] }, { a: 1, b: [{ c: true }] }, opts)
    ).toBe(true);
    expect(
      equalObjects(
        { a: 1, b: [{ c: true }] },
        { a: 1, b: [{ c: false }] },
        opts
      )
    ).toBe(false);
    expect(
      equalObjects({ a: 1, b: [{ c: NaN }] }, { a: 1, b: [{ c: NaN }] }, opts)
    ).toBe(true);
    expect(
      equalObjects({ a: 1, b: [{ c: NaN }] }, { a: '1', b: [{ c: NaN }] }, opts)
    ).toBe(false);
    expect(
      equalObjects(
        { a: 1, b: [{ c: true }] },
        { a: 1, b: [{ c: true, d: 1 }] },
        { testKeys: false }
      )
    ).toBe(false);
    expect(
      equalObjects(
        { a: 1, b: [{ c: true }] },
        { a: 1, b: [{ c: true, d: 1 }, { a: 1 }] },
        { testKeys: false, allowSubset: true }
      )
    ).toBe(true);
  });
});

describe('equal', () => {
  test('deeply compares two values', () => {
    const opts = { testKeys: true };
    expect(equal(true, true, opts)).toBe(true);
    expect(equal(false, false, opts)).toBe(true);
    expect(equal(0, 0, opts)).toBe(true);
    expect(equal(0, -0, opts)).toBe(true);
    expect(equal(1, 1, opts)).toBe(true);
    expect(equal('', '', opts)).toBe(true);
    expect(equal('a', 'a', opts)).toBe(true);
    expect(equal(null, null, opts)).toBe(true);
    expect(equal(undefined, undefined, opts)).toBe(true);
    expect(equal(NaN, NaN, opts)).toBe(true);
    expect(equal(NaN, null, opts)).toBe(false);
    expect(equal(NaN, undefined, opts)).toBe(false);
    expect(equal(Infinity, Infinity, opts)).toBe(true);
    expect(equal(Infinity, -Infinity, opts)).toBe(false);
    expect(equal([], [], opts)).toBe(true);
    expect(equal({}, {}, opts)).toBe(true);
    expect(equal({}, [], opts)).toBe(false);
    expect(equal({}, null, opts)).toBe(false);
    expect(equal(null, undefined, opts)).toBe(false);
    expect(equal('1', 1, opts)).toBe(false);

    expect(equal([], [], opts)).toBe(true);
    expect(equal([1], [], opts)).toBe(false);
    expect(equal([1], [1], opts)).toBe(true);
    expect(equal([undefined], [undefined], opts)).toBe(true);
    expect(equal([undefined], [], opts)).toBe(false);
    expect(equal([NaN], [NaN], opts)).toBe(true);
    expect(equal([NaN], [null], opts)).toBe(false);
    expect(equal([null], [NaN], opts)).toBe(false);
    expect(equal([1, 2], [1, 2], opts)).toBe(true);
    expect(equal([1, 2], [1, '2'], opts)).toBe(false);
    expect(equal([1, 2], [1, 1], opts)).toBe(false);
    expect(equal([1, 2, 3], [1, 2, 2], opts)).toBe(false);
    expect(equal([1, 2, 3], [1, 2, 3], opts)).toBe(true);
    expect(
      equal(
        [1, [], '', { a: 1, b: [null] }, true, null, undefined],
        [1, [], '', { a: 1, b: [null] }, true, null, undefined],
        opts
      )
    ).toBe(true);
    expect(
      equal(
        [1, [], '', { a: 1, b: [null] }, true, null, undefined],
        [1, [], '', { a: 1, b: [undefined] }, true, null, undefined],
        opts
      )
    ).toBe(false);

    expect(equal({}, {}, opts)).toBe(true);
    expect(equal({ a: undefined }, {}, opts)).toBe(false);
    expect(equal({ a: null }, {}, opts)).toBe(false);
    expect(equal({ a: null }, { a: undefined }, opts)).toBe(false);
    expect(equal({ a: null }, { a: null, b: undefined }, opts)).toBe(false);
    expect(
      equal({ a: 1, b: [{ c: true }] }, { a: 1, b: [{ c: true }] }, opts)
    ).toBe(true);
    expect(
      equal({ a: 1, b: [{ c: true }] }, { a: 1, b: [{ c: false }] }, opts)
    ).toBe(false);
    expect(
      equal({ a: 1, b: [{ c: NaN }] }, { a: 1, b: [{ c: NaN }] }, opts)
    ).toBe(true);
    expect(
      equal({ a: 1, b: [{ c: NaN }] }, { a: '1', b: [{ c: NaN }] }, opts)
    ).toBe(false);
    expect(
      equal(
        { a: [] },
        { a: null },
        {
          ...opts,
          normalize: (x): any => (Array.isArray(x) && !x.length ? null : x),
        }
      )
    ).toBe(true);
  });
});

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

test('shallowEqualValues', () => {
  expect(shallowEqualValues(undefined, undefined)).toBe(true);
  expect(shallowEqualValues(null, null)).toBe(true);
  expect(shallowEqualValues(NaN, NaN)).toBe(true);
  expect(shallowEqualValues(0, 0)).toBe(true);
  expect(shallowEqualValues(true, true)).toBe(true);
  expect(shallowEqualValues(false, false)).toBe(true);
  expect(shallowEqualValues('', '')).toBe(true);
  expect(shallowEqualValues('0', '0')).toBe(true);
  expect(shallowEqualValues(0, '0')).toBe(false);
  expect(
    shallowEqualValues(0, '0', { normalize: (x): string => x.toString() })
  ).toBe(true);
  expect(shallowEqualValues(0, '0', { normalize: (x): any => x })).toBe(false);
  expect(
    // tslint:disable-next-line triple-equals
    shallowEqualValues(0, '0', { equalValues: (a, b): boolean => a == b })
  ).toBe(true);
  expect(
    shallowEqualValues(null, undefined, {
      // tslint:disable-next-line triple-equals
      equalValues: (a, b): boolean => a == b,
    })
  ).toBe(true);
  expect(
    shallowEqualValues('undefined', undefined, {
      // tslint:disable-next-line triple-equals
      equalValues: (a, b): boolean => a == b,
    })
  ).toBe(false);
  expect(shallowEqualValues([], '')).toBe(false);
  expect(shallowEqualValues([], [])).toBe(false);
  expect(shallowEqualValues([], [])).toBe(false);
  expect(shallowEqualValues({}, {})).toBe(false);
});
