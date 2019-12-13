import { Value } from './Value';

describe('Value', () => {
  test('basic', () => {
    const value = new Value<number>(0);

    const vs1: Array<[number, number]> = [];
    const off1 = value.on((v, pv) => vs1.push([v, pv]));
    value.set(1);

    const vs2: Array<[number, number]> = [];
    const off2 = value.on((v, pv) => vs2.push([v, pv]));
    value.set(2);
    value.set(2);

    expect(off1()).toBe(true);
    value.set(3);

    expect(off1()).toBe(false);
    value.set(4);

    expect(off2()).toBe(true);
    value.set(5);

    expect(off2()).toBe(false);
    value.set(6);

    const vs3: Array<[number, number]> = [];
    const off3 = value.on((v, pv) => vs3.push([v, pv]));
    value.set(7);

    value.clear();
    value.set(8);

    expect(off3()).toBe(false);
    value.set(9);

    expect(vs1).toEqual([
      [1, 0],
      [2, 1],
    ]);
    expect(vs2).toEqual([
      [2, 1],
      [3, 2],
      [4, 3],
    ]);
    expect(vs3).toEqual([[7, 6]]);
  });
});
