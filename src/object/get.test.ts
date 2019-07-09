import { get } from './get';

describe('get', () => {
  test('should safely get a value at deep path', () => {
    expect(get(null, 'a')).toBe(undefined);
    expect(get({ a: { b: { c: 1 } } }, 'a.b.c')).toBe(1);
    expect(get({ a: { b: { c: 1 } } }, 'a.b.d')).toBe(undefined);
    expect(get({ a: { b: { c: 1 } } }, 'a.b.c.d')).toBe(undefined);
    expect(get({ a: { b: { c: 1 } } }, 'b.c.d')).toBe(undefined);
    expect(get({ a: { b: [{}, { c: 1 }] } }, 'a.b.1.c')).toBe(1);
    expect(get({ a: { b: [{}, { c: 1 }] } }, 'a.b.3.c')).toBe(undefined);
  });
});
