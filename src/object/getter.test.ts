import { getter } from './getter';

describe('getter', () => {
  test('should safely get a value at deep path', () => {
    expect(getter('a')(null)).toBe(undefined);
    expect(getter('a.b.c')({ a: { b: { c: 1 } } })).toBe(1);
    expect(getter('a.b.d')({ a: { b: { c: 1 } } })).toBe(undefined);
    expect(getter('a.b.c.d')({ a: { b: { c: 1 } } })).toBe(undefined);
    expect(getter('b.c.d')({ a: { b: { c: 1 } } })).toBe(undefined);
    expect(getter('a.b.1.c')({ a: { b: [{}, { c: 1 }] } })).toBe(1);
    expect(getter('a.b.3.c')({ a: { b: [{}, { c: 1 }] } })).toBe(undefined);
  });
});
