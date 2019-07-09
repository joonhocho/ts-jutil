import { defineLazyProp } from './defineLazyProp';

test('defineLazyProp', () => {
  const proto = {};
  let c = 0;
  expect(
    defineLazyProp(proto, 'a', () => {
      c += 1;
      return 3;
    })
  ).toBe(proto);
  expect(c).toBe(0);
  expect((proto as any).a).toBe(3);
  expect(c).toBe(1);
  expect((proto as any).a).toBe(3);
  expect(c).toBe(1);
  (proto as any).a = 4;
  expect((proto as any).a).toBe(4);
  expect(c).toBe(1);
});
