import { equalObjects } from './equal';

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
