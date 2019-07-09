import { defineMethod } from './defineMethod';

test('defineMethod', () => {
  const proto = {};
  const fn = (): void => {
    // noop
  };
  expect(defineMethod(proto, 'a', fn)).toBe(proto);
  expect(Object.getOwnPropertyDescriptor(proto, 'a')).toEqual({
    configurable: true,
    enumerable: false,
    value: fn,
    writable: true,
  });
});
