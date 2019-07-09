import { intersection } from './intersection';

describe('intersection', () => {
  test('returns an intersection of the two arrays', () => {
    expect(intersection([], [])).toEqual([]);
    expect(intersection([], ['a'])).toEqual([]);
    expect(intersection(['a'], [])).toEqual([]);

    const a1 = ['a', 'b', 'c', 'a', 'c'];
    const a2 = ['d', 'b', 'a'];

    let result = intersection(a1, a2);
    expect(result).toEqual(['a', 'b']);
    expect(result).not.toBe(a1);
    expect(result).not.toBe(a2);

    // Note that order matters.
    result = intersection(a2, a1);
    expect(result).toEqual(['b', 'a']);
  });

  test('with function', () => {
    const a1 = ['a', 'b', 'c', 'a', 'c'].map((v) => ({ v }));
    const a2 = ['a', 'd', 'b'].map((v) => ({ v }));
    const result = intersection(a1, a2, (x) => x.v).map(({ v }) => v);
    expect(result).toEqual(['a', 'b']);
    expect(result).not.toBe(a1);
    expect(result).not.toBe(a2);
  });

  test('with string', () => {
    const a1 = ['a', 'b', 'c', 'a', 'c'].map((v) => ({ v }));
    const a2 = ['a', 'd', 'b'].map((v) => ({ v }));
    const result = intersection(a1, a2, 'v').map(({ v }) => v);
    expect(result).toEqual(['a', 'b']);
    expect(result).not.toBe(a1);
    expect(result).not.toBe(a2);
  });

  test('not unique', () => {
    const a1 = ['a', 'b', 'c', 'a', 'c'];
    const a2 = ['d', 'b', 'a', 'a'];
    expect(intersection(a1, a2)).toEqual(['a', 'b']);
    expect(intersection(a2, a1)).toEqual(['b', 'a']);
    expect(intersection(a1, a2, null, true)).toEqual(['a', 'b']);
    expect(intersection(a1, a2, null, false)).toEqual(['a', 'b', 'a']);
  });
});
