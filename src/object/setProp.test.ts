import { setProp } from './setProp';

test('setProp', () => {
  expect(setProp({}, 'a', 1)).toEqual({ a: 1 });
  expect(setProp({ a: 1 }, 'b', 2)).toEqual({ a: 1, b: 2 });
  expect(setProp({ a: 1 }, 'a', 'hi')).toEqual({ a: 'hi' });
});
