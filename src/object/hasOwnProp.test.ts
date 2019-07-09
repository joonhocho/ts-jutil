import { hasOwnProp } from './hasOwnProp';

test('hasOwnProp', () => {
  expect(hasOwnProp({}, 'a')).toBe(false);
  expect(hasOwnProp({ a: 1 }, 'a')).toBe(true);
  expect(hasOwnProp([1], '0')).toBe(true);
  expect(hasOwnProp([], '0')).toBe(false);
  const o = Object.create(null);
  expect(hasOwnProp(o, 'a')).toBe(false);
  o.a = 1;
  expect(hasOwnProp(o, 'a')).toBe(true);
});
