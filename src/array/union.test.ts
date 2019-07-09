import { union } from './union';

describe('union', () => {
  test('returns a union of the two arrays', () => {
    const a1 = ['a', 'b', 'c', 'a', 'c'];
    const a2 = ['a', 'd', 'b'];
    const result = union(a1, a2);
    expect(result).toEqual(['a', 'b', 'c', 'd']);
    expect(result).not.toBe(a1);
    expect(result).not.toBe(a2);
  });

  test('with function', () => {
    const a1 = ['a', 'b', 'c', 'a', 'c'].map((v) => ({ v }));
    const a2 = ['a', 'd', 'b'].map((v) => ({ v }));
    const result = union(a1, a2, (x) => x.v).map(({ v }) => v);
    expect(result).toEqual(['a', 'b', 'c', 'd']);
    expect(result).not.toBe(a1);
    expect(result).not.toBe(a2);
  });

  test('with string', () => {
    const a1 = ['a', 'b', 'c', 'a', 'c'].map((v) => ({ v }));
    const a2 = ['a', 'd', 'b'].map((v) => ({ v }));
    const result = union(a1, a2, 'v').map(({ v }) => v);
    expect(result).toEqual(['a', 'b', 'c', 'd']);
    expect(result).not.toBe(a1);
    expect(result).not.toBe(a2);
  });
});
