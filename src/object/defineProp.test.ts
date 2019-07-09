import { defineProp } from './defineProp';

test('defineProp', () => {
  const proto = {};
  expect(defineProp(proto, 'a', 3)).toBe(proto);
  expect(Object.getOwnPropertyDescriptor(proto, 'a')).toEqual({
    configurable: true,
    enumerable: true,
    value: 3,
    writable: true,
  });
  expect((proto as any).a).toBe(3);
});
