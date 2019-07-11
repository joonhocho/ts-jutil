import { last } from '_src/array/last';
import { mapPromise } from './mapPromise';

// tslint:disable-next-line typedef
const promiseLike = (v: any) => ({
  // tslint:disable-next-line typedef
  then: (x: any) => Promise.resolve(x(v)),
});

test('mapPromise', async () => {
  expect(mapPromise(1, String)).toBe('1');
  expect(mapPromise(null, String)).toBe('null');
  expect(mapPromise(undefined, String)).toBe('undefined');
  expect(mapPromise([1], last)).toBe(1);
  expect(await mapPromise(Promise.resolve(null), String)).toBe('null');
  expect(await mapPromise(promiseLike(null), String)).toBe('null');
});
