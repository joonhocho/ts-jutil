import { cloneDeep } from './cloneDeep';

describe('cloneDeep', () => {
  test('clones simple values', () => {
    expect(cloneDeep(undefined)).toBe(undefined);
    expect(cloneDeep(null)).toBe(null);
    expect(cloneDeep(false)).toBe(false);
    expect(cloneDeep(true)).toBe(true);
    expect(cloneDeep(0)).toBe(0);
    expect(cloneDeep(1)).toBe(1);
    expect(cloneDeep('')).toBe('');
    expect(cloneDeep('a')).toBe('a');
    expect(cloneDeep([])).toEqual([]);
    expect(cloneDeep({})).toEqual({});
    expect(cloneDeep(NaN)).toBeNaN();
  });

  test('clones deeply', () => {
    const obj = {
      a: undefined,
      b: null,
      c: 0,
      d: false,
      e: [{ a: 1 }, null, undefined],
      f: { a: [3] },
    };

    const clone = cloneDeep(obj);

    expect(clone).not.toBe(obj);
    expect(clone).toEqual(obj);

    expect(clone.e).not.toBe(obj.e);
    expect(clone.e).toEqual(obj.e);
    expect(Array.isArray(clone.e)).toBe(true);

    expect(clone.e[0]).not.toBe(obj.e[0]);
    expect(clone.e[0]).toEqual(obj.e[0]);

    expect(clone.f).not.toBe(obj.f);
    expect(clone.f).toEqual(obj.f);
  });
});
