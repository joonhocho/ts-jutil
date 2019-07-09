import { toKeys } from './toKeys';

describe('toKeys', () => {
  test('basic', () => {
    const arr = [3, 5, 'a', 'd'];

    // basic
    expect(toKeys(arr)).toEqual({
      3: true,
      5: true,
      a: true,
      d: true,
    });

    // with value as false
    expect(toKeys(arr, null, false)).toEqual({
      3: false,
      5: false,
      a: false,
      d: false,
    });

    // with value as null
    expect(toKeys(arr, null, null)).toEqual({
      3: null,
      5: null,
      a: null,
      d: null,
    });

    // with value function
    expect(toKeys(arr, null, (x) => `v${x}`)).toEqual({
      3: 'v3',
      5: 'v5',
      a: 'va',
      d: 'vd',
    });

    // with toKey
    expect(toKeys(arr, (x) => `k${x}`)).toEqual({
      k3: true,
      k5: true,
      ka: true,
      kd: true,
    });

    // with toKey and toValue
    expect(toKeys(arr, (x) => `k${x}`, (x) => `v${x}`)).toEqual({
      k3: 'v3',
      k5: 'v5',
      ka: 'va',
      kd: 'vd',
    });

    // toKey as string
    expect(toKeys([{ v: 1 }, { v: '2' }], 'v')).toEqual({
      1: true,
      2: true,
    });

    // toKey as string, toValue
    expect(toKeys([{ v: 1 }, { v: '2' }], 'v', (x) => x.v)).toEqual({
      1: 1,
      2: '2',
    });

    const o = { c: true };
    expect(toKeys([{ v: 1 }, { v: '2' }], 'v', (x) => x.v, o)).toBe(o);
    expect(o).toEqual({
      1: 1,
      2: '2',
      c: true,
    });
  });
});
