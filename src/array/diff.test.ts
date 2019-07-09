import { diff } from './diff';

describe('diff', () => {
  test('returns a diff of the two arrays', () => {
    expect(diff([], [])).toEqual([]);
    expect(diff([], ['a'])).toEqual([]);
    expect(diff(['a'], [])).toEqual(['a']);
    expect(diff(['a', 'a'], [])).toEqual(['a']);
    expect(diff(['a', 'a'], [], null, false)).toEqual(['a', 'a']);

    const a1 = ['a', 'b', 'c', 'a', 'c'];
    const a2 = ['a', 'd', 'b'];

    let result = diff(a1, a2);
    expect(result).toEqual(['c']);
    expect(result).not.toBe(a1);
    expect(result).not.toBe(a2);

    result = diff(a2, a1);
    expect(result).toEqual(['d']);

    expect(
      diff(
        [{ v: 1 }, { v: 2 }, { v: 3 }],
        [{ v: 2 }, { v: 3 }, { v: 4 }],
        ({ v }) => v
      )
    ).toEqual([{ v: 1 }]);

    expect(
      diff(
        [{ v: 2 }, { v: 3 }, { v: 4 }],
        [{ v: 1 }, { v: 2 }, { v: 3 }],
        ({ v }) => v
      )
    ).toEqual([{ v: 4 }]);
  });

  test('with function', () => {
    const a1 = ['a', 'b', 'c', 'a', 'c'].map((v) => ({ v }));
    const a2 = ['a', 'd', 'b'].map((v) => ({ v }));
    const result = diff(a1, a2, (x) => x.v).map(({ v }) => v);
    expect(result).toEqual(['c']);
    expect(result).not.toBe(a1);
    expect(result).not.toBe(a2);
  });

  test('with string', () => {
    const a1 = ['a', 'b', 'c', 'a', 'c'].map((v) => ({ v }));
    const a2 = ['a', 'd', 'b'].map((v) => ({ v }));
    const result = diff(a1, a2, 'v').map(({ v }) => v);
    expect(result).toEqual(['c']);
    expect(result).not.toBe(a1);
    expect(result).not.toBe(a2);
  });

  test('not unique', () => {
    const a1 = ['a', 'b', 'c', 'a', 'c'];
    const a2 = ['d', 'b', 'a', 'a'];
    expect(diff(a1, a2)).toEqual(['c']);
    expect(diff(a2, a1)).toEqual(['d']);
    expect(diff(a1, a2, null, true)).toEqual(['c']);
    expect(diff(a1, a2, null, false)).toEqual(['c', 'c']);
    expect(
      diff(['a', 'b', 'c', 'a', 'c'], ['d', 'b', 'a'], null, false)
    ).toEqual(['c', 'a', 'c']);
    expect(
      diff(['d', 'b', 'a'], ['a', 'b', 'c', 'a', 'c'], null, false)
    ).toEqual(['d']);
  });
});
