import { stringify } from './stringify';

test('stringify', () => {
  expect(stringify({ a: 1 })).toBe('{\n  "a": 1\n}');
  expect(stringify({ a: 1, b: 2 })).toBe('{\n  "a": 1,\n  "b": 2\n}');
});
