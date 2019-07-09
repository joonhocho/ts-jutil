import { getProp } from './getProp';

test('getProp', () => {
  expect(getProp({} as any, 'a')).toEqual(undefined);
  expect(getProp({ a: 1 }, 'a')).toEqual(1);
  expect(getProp({ a: 1 }, 'b' as any)).toEqual(undefined);
});
