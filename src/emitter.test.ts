import { Emitter } from './emitter';

describe('Emitter', () => {
  test('basic', () => {
    const emitter = new Emitter<number>();

    emitter.emit(0);

    const vs1: number[] = [];
    const off1 = emitter.on((v) => vs1.push(v));
    emitter.emit(1);

    const vs2: number[] = [];
    const off2 = emitter.on((v) => vs2.push(v));
    emitter.emit(2);
    emitter.emit(2);

    expect(off1()).toBe(true);
    emitter.emit(3);

    expect(off1()).toBe(false);
    emitter.emit(4);

    expect(off2()).toBe(true);
    emitter.emit(5);

    expect(off2()).toBe(false);
    emitter.emit(6);

    const vs3: number[] = [];
    const off3 = emitter.on((v) => vs3.push(v));
    emitter.emit(7);

    emitter.clear();
    emitter.emit(8);

    expect(off3()).toBe(false);
    emitter.emit(9);

    expect(vs1).toEqual([1, 2, 2]);
    expect(vs2).toEqual([2, 2, 3, 4]);
    expect(vs3).toEqual([7]);
  });
});
