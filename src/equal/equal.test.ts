import { equal } from './equal';

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
