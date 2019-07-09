import { toResult } from './toResult';

test('toResult', async () => {
  expect(toResult(null)).toEqual({ data: null, error: null, resolved: true });

  expect(await toResult(Promise.resolve(null))).toEqual({
    data: null,
    error: null,
    resolved: true,
  });

  expect(await toResult(Promise.resolve(10))).toEqual({
    data: 10,
    error: null,
    resolved: true,
  });

  expect(await toResult(Promise.reject(10))).toEqual({
    data: null,
    error: 10,
    resolved: false,
  });

  expect(await toResult(new Error('hi'))).toMatchObject({
    data: null,
    resolved: false,
  });
});
