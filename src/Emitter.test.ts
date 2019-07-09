import { Emitter } from './Emitter';

test('Emitter', () => {
  const emitter = new Emitter<number>();

  expect(emitter.count()).toBe(0);

  emitter.emit(0);

  const vs1: number[] = [];
  const off1 = emitter.on((v) => vs1.push(v));
  expect(emitter.count()).toBe(1);
  emitter.emit(1);

  const vs2: number[] = [];
  const off2 = emitter.prepend((v) => vs2.push(v));
  expect(emitter.count()).toBe(2);
  emitter.emit(2);
  emitter.emit(2);

  expect(off1()).toBe(true);
  expect(emitter.count()).toBe(1);
  emitter.emit(3);

  expect(off1()).toBe(false);
  expect(emitter.count()).toBe(1);
  emitter.emit(4);

  expect(off2()).toBe(true);
  expect(emitter.count()).toBe(0);
  emitter.emit(5);

  expect(off2()).toBe(false);
  expect(emitter.count()).toBe(0);
  emitter.emit(6);

  const vs3: number[] = [];
  const off3 = emitter.on((v) => vs3.push(v));
  expect(emitter.count()).toBe(1);
  emitter.emit(7);

  emitter.clear();
  expect(emitter.count()).toBe(0);
  emitter.emit(8);

  expect(off3()).toBe(false);
  expect(emitter.count()).toBe(0);
  emitter.emit(9);

  const vs4: number[] = [];
  emitter.once((v) => vs4.push(v));
  expect(emitter.count()).toBe(1);
  emitter.emit(10);
  expect(emitter.count()).toBe(0);
  emitter.emit(11);
  expect(emitter.count()).toBe(0);

  const off5 = emitter.once((v) => vs4.push(v));
  expect(emitter.count()).toBe(1);
  off5();
  expect(emitter.count()).toBe(0);

  expect(vs1).toEqual([1, 2, 2]);
  expect(vs2).toEqual([2, 2, 3, 4]);
  expect(vs3).toEqual([7]);
  expect(vs4).toEqual([10]);
});

test('Emitter with return value', () => {
  const emitter = new Emitter<number, number>();

  emitter.on((v, _acc) => v + v);
  emitter.on((v, acc) => v + (acc || 0));
  emitter.prepend((v, _acc) => v * v);

  expect(emitter.emit(1)).toBe(3);
  expect(emitter.emitGet(1)).toEqual([1, 2, 3]);
  expect(emitter.emit(2)).toBe(6);
  expect(emitter.emitGet(2)).toEqual([4, 4, 6]);
  expect(emitter.emit(3)).toBe(9);
  expect(emitter.emitGet(3)).toEqual([9, 6, 9]);
});
