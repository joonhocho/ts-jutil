import { lazyGet } from './lazyGet';

test('lazyGet', () => {
  const getter = jest.fn().mockImplementation(() => new Date());
  const lazied = lazyGet(getter);
  expect(getter).toBeCalledTimes(0);
  const d = lazied();
  expect(getter).toBeCalledTimes(1);
  expect(d).toBeInstanceOf(Date);
  expect(lazied()).toBe(d);
  expect(lazied()).toBe(d);
  expect(getter).toBeCalledTimes(1);

  const getter2 = jest.fn().mockImplementation(() => undefined);
  const lazied2 = lazyGet(getter2);
  expect(getter2).toBeCalledTimes(0);
  expect(lazied2()).toBe(undefined);
  expect(getter2).toBeCalledTimes(1);
  expect(lazied2()).toBe(undefined);
  expect(getter2).toBeCalledTimes(1);
});
