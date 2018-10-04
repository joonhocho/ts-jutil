import {
  concatArrays,
  countByIndex,
  diff,
  every,
  filter,
  first,
  forEach,
  forN,
  indexItems,
  indexItemsToList,
  intersection,
  join,
  last,
  map,
  mapFilter,
  mapN,
  mapToUniqueString,
  maybeAdd,
  maybeRemoveFirst,
  maybeRemoveLast,
  pluck,
  prependToNewSet,
  prependToSet,
  pushToNewSet,
  pushToSet,
  reduce,
  reduceFunctions,
  reduceRight,
  reduceRightFunctions,
  shallowEqual,
  some,
  toggle,
  toKeys,
  union,
  unique,
  uniqueByKey,
  uniqueItems,
  uniqueWithIndexes,
  withoutFalsy,
  withoutItem,
  withoutNil,
  withoutUndefined,
} from './array';

describe('array', () => {
  describe('first', () => {
    test('returns the first item of an array', () => {
      expect(first([])).toBe(undefined);
      expect(first([1])).toBe(1);
      expect(first([1, 2])).toBe(1);
    });
  });

  describe('last', () => {
    test('returns the last item of an array', () => {
      expect(last([])).toBe(undefined);
      expect(last([1])).toBe(1);
      expect(last([1, 2])).toBe(2);
    });
  });

  test('forEach', () => {
    const args1: any = [];
    const args2: any = [];
    const arr = [5, 1, 0, 3, null, 9];
    forEach(arr, (...args: any[]) => args1.push(args));
    arr.forEach((...args: any[]) => args2.push(args));
    expect(args1).toEqual(args2);
  });

  test('map', () => {
    const args1: any = [];
    const args2: any = [];
    const arr = [5, 1, 0, 3, null, 9];
    const res1 = map(arr, (...args: any[]) => {
      args1.push(args);
      return String(args[0]);
    });
    const res2 = arr.map((...args: any[]) => {
      args2.push(args);
      return String(args[0]);
    });
    expect(res1).toEqual(res2);
    expect(args1).toEqual(args2);
    expect(map([], (x) => x)).toEqual([]);
    const src: any = [];
    expect(map(src, (x) => x)).not.toBe(src);
  });

  test('mapToUniqueString', () => {
    expect(mapToUniqueString([5, 0, null, 0, 9, 5], String)).toEqual([
      '5',
      '0',
      'null',
      '9',
    ]);
    expect(
      mapToUniqueString([5, 0, null, 0, 9, 5], (x) => (x && String(x)) || null)
    ).toEqual(['5', '9']);
  });

  test('mapFilter', () => {
    expect(
      mapFilter(
        [5, 1, 0, 3, null, 9],
        (v: any) => (v > 0 ? String(v) : undefined),
        undefined
      )
    ).toEqual(['5', '1', '3', '9']);

    expect(mapFilter([5, 1, 0, 3, null, 9], String, '3')).toEqual([
      '5',
      '1',
      '0',
      'null',
      '9',
    ]);

    expect(mapFilter([5, 1, 0, 3, null, 9], (x) => x, 1)).toEqual([
      5,
      0,
      3,
      null,
      9,
    ]);

    expect(mapFilter([5, 1, 0, 3, null, 9], Boolean, true)).toEqual([
      false,
      false,
    ]);

    expect(
      mapFilter([5, 1, 0, 3, null, 9], (x, i) => String(x) + i, undefined)
    ).toEqual(['50', '11', '02', '33', 'null4', '95']);
    const src: any = [];
    expect(mapFilter([], (x) => x, undefined)).toEqual([]);
    expect(mapFilter(src, (x) => x, undefined)).not.toBe(src);
  });

  test('filter', () => {
    const args1: any = [];
    const args2: any = [];
    const arr = [5, 1, 0, 3, null, 9];
    const res1 = filter(arr, (...args: any[]) => {
      args1.push(args);
      return args[0];
    });
    const res2 = arr.filter((...args: any[]) => {
      args2.push(args);
      return args[0];
    });
    expect(res1).toEqual(res2);
    expect(args1).toEqual(args2);
  });

  test('every', () => {
    const args1: any = [];
    const args2: any = [];
    const arr = [5, 1, 0, 3, null, 9];
    const res1 = every(arr, (...args: any[]) => {
      args1.push(args);
      return args[0];
    });
    const res2 = arr.every((...args: any[]) => {
      args2.push(args);
      return args[0];
    });
    expect(res1).toEqual(res2);
    expect(args1).toEqual(args2);
  });

  test('some', () => {
    const args1: any = [];
    const args2: any = [];
    const arr = [5, 1, 0, 3, null, 9];
    const res1 = some(arr, (...args: any[]) => {
      args1.push(args);
      return args[0];
    });
    const res2 = arr.some((...args: any[]) => {
      args2.push(args);
      return args[0];
    });
    expect(res1).toEqual(res2);
    expect(args1).toEqual(args2);
  });

  test('reduce', () => {
    const args1: any = [];
    const args2: any = [];
    const arr = [5, 1, 0, 3, null, 9];
    const res1 = reduce(
      arr,
      (...args: any[]) => {
        args1.push(args);
        return args[0] + (args[1] || 0);
      },
      -1
    );
    const res2 = arr.reduce((...args: any[]) => {
      args2.push(args);
      return args[0] + (args[1] || 0);
    }, -1);
    expect(res1).toEqual(res2);
    expect(args1).toEqual(args2);
  });

  test('reduceRight', () => {
    const args1: any = [];
    const args2: any = [];
    const arr = [5, 1, 0, 3, null, 9];
    const res1 = reduceRight(
      arr,
      (...args: any[]) => {
        args1.push(args);
        return args[0] + (args[1] || 0);
      },
      -1
    );
    const res2 = arr.reduceRight((...args: any[]) => {
      args2.push(args);
      return args[0] + (args[1] || 0);
    }, -1);
    expect(res1).toEqual(res2);
    expect(args1).toEqual(args2);
  });

  test('reduceFunctions', () => {
    expect(
      reduceFunctions(
        // tslint:disable-next-line typedef
        [(a: any) => a + 1, (a: any) => a * 2, (a: any) => a + 3] as any,
        7
      )
    ).toBe((7 + 1) * 2 + 3);
  });

  test('reduceRightFunctions', () => {
    expect(
      reduceRightFunctions(
        // tslint:disable-next-line typedef
        [(a: any) => a + 1, (a: any) => a * 2, (a: any) => a + 3] as any,
        7
      )
    ).toBe(1 + 2 * (3 + 7));
  });

  describe('pluck', () => {
    test('returns a new array of the plucked values from the array', () => {
      const arr = [{ a: 1, b: 2 }, { b: 3, c: 4 }, { a: 5, c: 6 }];
      expect(pluck(arr, 'a')).toEqual([1, undefined, 5]);
      expect(pluck(arr, 'b')).toEqual([2, 3, undefined]);
      expect(pluck(arr, 'c')).toEqual([undefined, 4, 6]);
    });
  });

  test('maybeAdd', () => {
    const arr = [1, 2, 3];
    expect(maybeAdd(arr, 1)).toBe(-1);
    expect(arr).toEqual([1, 2, 3]);
    expect(maybeAdd(arr, 0)).toBe(3);
    expect(arr).toEqual([1, 2, 3, 0]);
    expect(maybeAdd(arr, 0)).toBe(-1);
    expect(arr).toEqual([1, 2, 3, 0]);
  });

  test('maybeRemoveFirst', () => {
    const arr = [1, 2, 3, 1, 2, 3];
    expect(maybeRemoveFirst(arr, 1)).toBe(0);
    expect(arr).toEqual([2, 3, 1, 2, 3]);

    expect(maybeRemoveFirst(arr, 1)).toBe(2);
    expect(arr).toEqual([2, 3, 2, 3]);

    expect(maybeRemoveFirst(arr, 1)).toBe(-1);
    expect(arr).toEqual([2, 3, 2, 3]);

    expect(maybeRemoveFirst(arr, 0)).toBe(-1);
    expect(arr).toEqual([2, 3, 2, 3]);

    expect(maybeRemoveFirst(arr, 2)).toBe(0);
    expect(arr).toEqual([3, 2, 3]);
  });

  test('maybeRemoveLast', () => {
    const arr = [1, 2, 3, 1, 2, 3];
    expect(maybeRemoveLast(arr, 1)).toBe(3);
    expect(arr).toEqual([1, 2, 3, 2, 3]);

    expect(maybeRemoveLast(arr, 1)).toBe(0);
    expect(arr).toEqual([2, 3, 2, 3]);

    expect(maybeRemoveLast(arr, 1)).toBe(-1);
    expect(arr).toEqual([2, 3, 2, 3]);

    expect(maybeRemoveLast(arr, 0)).toBe(-1);
    expect(arr).toEqual([2, 3, 2, 3]);

    expect(maybeRemoveLast(arr, 2)).toBe(2);
    expect(arr).toEqual([2, 3, 3]);
  });

  test('withoutItem', () => {
    expect(withoutItem([], undefined)).toEqual([]);
    expect(withoutItem([1], undefined)).toEqual([1]);
    expect(withoutItem([1], 1)).toEqual([]);
    expect(withoutItem([2, 1], 1)).toEqual([2]);
    expect(withoutItem([2, 1, 2, 1, '1', 3], 1)).toEqual([2, 2, '1', 3]);
  });

  test('withoutUndefined', () => {
    expect(withoutUndefined([])).toEqual([]);
    expect(
      withoutUndefined([undefined, null, 0, false, '', NaN, 1, 'a'])
    ).toEqual([null, 0, false, '', NaN, 1, 'a']);
  });

  test('withoutNil', () => {
    expect(withoutNil([])).toEqual([]);
    expect(withoutNil([undefined, null, 0, false, '', NaN, 1, 'a'])).toEqual([
      0,
      false,
      '',
      NaN,
      1,
      'a',
    ]);
  });

  test('withoutFalsy', () => {
    expect(withoutFalsy([])).toEqual([]);
    expect(withoutFalsy([undefined, null, 0, false, '', NaN, 1, 'a'])).toEqual([
      1,
      'a',
    ]);
  });

  describe('toggle', () => {
    test('adds item if not exists', () => {
      const arr = [1, 2, 3];

      toggle(arr, 5);
      expect(arr).toEqual([1, 2, 3, 5]);

      toggle(arr, 5);
      expect(arr).toEqual([1, 2, 3]);
    });

    test('removes item if exists', () => {
      const arr = [1, 2, 3];
      toggle(arr, 2);
      expect(arr).toEqual([1, 3]);
    });
  });

  describe('pushToSet', () => {
    test('push to set', () => {
      const arr = [1, 2, 3];

      expect(pushToSet(arr, 4)).toBe(true);
      expect(arr).toEqual([1, 2, 3, 4]);

      expect(pushToSet(arr, 4)).toBe(false);
      expect(arr).toEqual([1, 2, 3, 4]);

      expect(pushToSet(arr, 2)).toBe(false);
      expect(arr).toEqual([1, 2, 3, 4]);

      expect(pushToSet(arr, 0)).toBe(true);
      expect(arr).toEqual([1, 2, 3, 4, 0]);
    });
  });

  describe('prependToSet', () => {
    test('prepend to set', () => {
      const arr = [1, 2, 3];

      expect(prependToSet(arr, 4)).toBe(true);
      expect(arr).toEqual([4, 1, 2, 3]);

      expect(prependToSet(arr, 4)).toBe(false);
      expect(arr).toEqual([4, 1, 2, 3]);

      expect(prependToSet(arr, 2)).toBe(false);
      expect(arr).toEqual([4, 1, 2, 3]);

      expect(prependToSet(arr, 0)).toBe(true);
      expect(arr).toEqual([0, 4, 1, 2, 3]);
    });
  });

  describe('pushToNewSet', () => {
    test('push to new set', () => {
      const arr = [1, 2, 3];

      expect(pushToNewSet(arr, 4)).toEqual([1, 2, 3, 4]);
      expect(arr).toEqual([1, 2, 3]);
      expect(pushToNewSet(arr, 4)).toEqual([1, 2, 3, 4]);
      expect(pushToNewSet(arr, 2)).toEqual([1, 2, 3]);
      expect(pushToNewSet(arr, 0)).toEqual([1, 2, 3, 0]);
    });
  });

  describe('prependToNewSet', () => {
    test('prepend to new set', () => {
      const arr = [1, 2, 3];

      expect(prependToNewSet(arr, 4)).toEqual([4, 1, 2, 3]);
      expect(arr).toEqual([1, 2, 3]);
      expect(prependToNewSet(arr, 4)).toEqual([4, 1, 2, 3]);
      expect(prependToNewSet(arr, 2)).toEqual([1, 2, 3]);
      expect(prependToNewSet(arr, 0)).toEqual([0, 1, 2, 3]);
    });
  });

  describe('forN', () => {
    test('calls function n times', () => {
      const list: any = [];
      forN(
        3,
        function f(this: any[], i): void {
          this.push(2 * i);
        },
        list
      );
      expect(list).toEqual([0, 2, 4]);
    });
  });

  describe('mapN', () => {
    test('calls function n times', () => {
      const list = mapN(3, (a) => a * 2, null);
      expect(list).toEqual([0, 2, 4]);
    });
    test('calls function n times', () => {
      const list = mapN(3, (a, b) => a + b, [1, 2]);
      expect(list).toEqual([3, 3, 3]);
    });
  });

  describe('concatArrays', () => {
    test('concat array of arrays into a new flat array', () => {
      expect(concatArrays([])).toEqual([]);
      expect(concatArrays([[]])).toEqual([]);
      expect(concatArrays([[], []])).toEqual([]);
      expect(concatArrays([[1], [2], [3]])).toEqual([1, 2, 3]);
      expect(concatArrays([[1], [2], [3], []])).toEqual([1, 2, 3]);
    });
  });

  test('shallowEqual', () => {
    expect(shallowEqual(null, undefined as any)).toBe(false);
    expect(shallowEqual(null, null)).toBe(true);
    expect(shallowEqual([], null)).toBe(false);
    expect(shallowEqual(null, [])).toBe(false);
    expect(shallowEqual([], [])).toBe(true);
    expect(shallowEqual(['a'], [])).toBe(false);
    expect(shallowEqual(['a'], ['b'])).toBe(false);
    expect(shallowEqual(['a'], ['a'])).toBe(true);
    expect(shallowEqual(['a', 1], ['a'])).toBe(false);
    expect(shallowEqual(['a', 1], ['a', 1])).toBe(true);
    expect(shallowEqual(['a', 1], [1, 'a'])).toBe(false);
    expect(shallowEqual(['a', 1], [, 'a', 1])).toBe(false);
  });

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

  describe('indexItems', () => {
    test('with key name', () => {
      const arr = [{ id: 1 }, {}, null, { id: 'a' }];
      expect(indexItems(arr, 'id' as any)).toEqual({
        1: arr[0],
        a: arr[3],
      });
    });

    test('with toKey function', () => {
      const arr = [{ id: 1 }, {}, null, { id: 'a' }, { id: 1, b: 1 }];
      expect(indexItems(arr, (x: any) => x && x.id)).toEqual({
        1: arr[4],
        a: arr[3],
      });
    });
  });

  describe('indexItemsToList', () => {
    test('with key name', () => {
      const arr = [{ id: 1 }, {}, null, { id: 'a' }];
      expect(indexItemsToList(arr, 'id' as any)).toEqual({
        1: [arr[0]],
        a: [arr[3]],
      });
    });

    test('with toKey function', () => {
      const arr = [{ id: 1 }, {}, null, { id: 'a' }, { id: 1, b: 1 }];
      expect(indexItemsToList(arr, (x: any) => x && x.id)).toEqual({
        1: [arr[0], arr[4]],
        a: [arr[3]],
      });
    });
  });

  test('countByIndex', () => {
    expect(countByIndex([], 'id' as any)).toEqual({});

    expect(countByIndex(['a', 'b', 'c', 'a'])).toEqual({
      a: 2,
      b: 1,
      c: 1,
    });

    expect(countByIndex(['a', 'b', 'c', 'a'], null, { b: 3, d: 1 })).toEqual({
      a: 2,
      b: 4,
      c: 1,
      d: 1,
    });

    expect(countByIndex(['a', 'b', 'c', 'a'].map((k) => ({ k })), 'k')).toEqual(
      {
        a: 2,
        b: 1,
        c: 1,
      }
    );

    expect(
      countByIndex(['a', 'b', 'c', 'a'].map((k) => ({ k })), ({ k }) => k)
    ).toEqual({
      a: 2,
      b: 1,
      c: 1,
    });
  });

  describe('unique', () => {
    test('without toKey', () => {
      expect(unique([])).toEqual([]);

      const arr = ['a', 'b', 'c', 'a', 'c'];
      const result = unique(arr);
      expect(result).toEqual(['a', 'b', 'c']);
      expect(result).not.toBe(arr);
    });

    test('with toKey = function', () => {
      expect(unique([], (x) => x)).toEqual([]);

      const arr = ['a', 'b', 'c', 'a', 'c'].map((key) => ({ key }));
      const result = unique(arr, ({ key }) => key);
      expect(result).toEqual([{ key: 'a' }, { key: 'b' }, { key: 'c' }]);
      expect(result).not.toBe(arr);
    });

    test('with toKey = string', () => {
      expect(unique([], 'k' as any)).toEqual([]);

      const arr = ['a', 'b', 'c', 'a', 'c'].map((k) => ({ k }));
      const result = unique(arr, 'k');
      expect(result).toEqual([{ k: 'a' }, { k: 'b' }, { k: 'c' }]);
      expect(result).not.toBe(arr);
    });
  });

  test('uniqueItems', () => {
    expect(uniqueItems([])).toEqual([]);
    expect(uniqueItems([1, 2, 3, 2, 1])).toEqual([1, 2, 3]);
    expect(uniqueItems([1, 2, 3, 2, 1].map(String))).toEqual(
      [1, 2, 3].map(String)
    );
  });

  test('uniqueByKey', () => {
    expect(uniqueByKey([], 'v')).toEqual([]);
    expect(uniqueByKey([1, 2, 3, 2, 1].map((v) => ({ v })), 'v')).toEqual(
      [1, 2, 3].map((v) => ({ v }))
    );
  });

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

  describe('join', () => {
    test('should insert a separator inbetween each item in the list', () => {
      expect(join([], 5)).toEqual([]);
      expect(join([1], 5)).toEqual([1]);
      expect(join([1, 2], 5)).toEqual([1, 5, 2]);
      expect(join([1, 2, 3], 5)).toEqual([1, 5, 2, 5, 3]);
    });
  });

  describe('uniqueWithIndexes', () => {
    test('without toKey', () => {
      expect(uniqueWithIndexes([])).toEqual({ list: [], indexes: [] });

      const arr = ['a', 'b', 'c', 'a', 'c'];
      const result = uniqueWithIndexes(arr);
      expect(result).toEqual({
        list: ['a', 'b', 'c'],
        indexes: [0, 1, 2, 0, 2],
      });
      expect(arr).toEqual(['a', 'b', 'c', 'a', 'c']);
    });

    test('with toKey = function', () => {
      const toItem = (key: string): any => ({ key });
      const toKey = ({ key }: any): string => key;
      expect(uniqueWithIndexes([], toKey)).toEqual({ list: [], indexes: [] });

      const arr = ['a', 'b', 'c', 'a', 'c'].map(toItem);
      const result = uniqueWithIndexes(arr, toKey);
      expect(result).toEqual({
        list: ['a', 'b', 'c'].map(toItem),
        indexes: [0, 1, 2, 0, 2],
      });
      expect(arr).toEqual(['a', 'b', 'c', 'a', 'c'].map(toItem));
    });

    test('with toKey = string', () => {
      const toItem = (key: string): any => ({ key });
      expect(uniqueWithIndexes([], 'key' as any)).toEqual({
        list: [],
        indexes: [],
      });

      const arr = ['a', 'b', 'c', 'a', 'c', 'd'].map(toItem);
      const result = uniqueWithIndexes(arr, 'key');
      expect(result).toEqual({
        list: ['a', 'b', 'c', 'd'].map(toItem),
        indexes: [0, 1, 2, 0, 2, 3],
      });
      expect(arr).toEqual(['a', 'b', 'c', 'a', 'c', 'd'].map(toItem));
    });
  });
});
