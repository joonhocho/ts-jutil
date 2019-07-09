import { propGetter } from './propGetter';

test('propGetter', () => {
  expect(propGetter('a')({} as any)).toEqual(undefined);
  expect(propGetter('a')({ a: 1 } as any)).toEqual(1);
  expect(propGetter('a')({ b: 1 } as any)).toEqual(undefined);
});
