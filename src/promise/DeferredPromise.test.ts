import { DeferredPromise } from './DeferredPromise';
import { sleep } from './sleep';

test('DeferredPromise', async () => {
  const deferred = new DeferredPromise();
  setTimeout(() => {
    deferred.resolve(1);
    deferred.resolve(2);
    deferred.reject('error');
  }, 10);

  expect(deferred.status).toBe('pending');
  expect(deferred.fulfilled).toBe(false);
  expect(deferred.rejected).toBe(false);

  expect(await deferred.promise).toBe(1);
  expect(await deferred.then((x: any) => x * 2)).toBe(2);

  expect(deferred.status).toBe('fulfilled');
  expect(deferred.fulfilled).toBe(true);
  expect(deferred.rejected).toBe(false);

  await sleep(1);

  expect(await deferred.promise).toBe(1);

  const deferred2 = new DeferredPromise();
  setTimeout(() => {
    deferred2.reject('e');
    deferred2.reject('e2');
    deferred2.resolve(2);
  }, 10);

  expect(deferred2.status).toBe('pending');
  expect(deferred2.fulfilled).toBe(false);
  expect(deferred2.rejected).toBe(false);

  await expect(deferred2.promise).rejects.toBe('e');

  expect(deferred2.status).toBe('rejected');
  expect(deferred2.fulfilled).toBe(false);
  expect(deferred2.rejected).toBe(true);

  await sleep(1);

  await expect(deferred2.promise).rejects.toBe('e');

  // timeout
  const deferred3 = new DeferredPromise(5);
  const errorP = expect(deferred3.promise).rejects.toThrowError('timeout');
  await sleep(10);
  deferred3.resolve(true);
  await errorP;

  // resolve before timeout
  const deferred4 = new DeferredPromise(20);
  await sleep(10);
  deferred4.resolve('good');
  expect(await deferred4.promise).toBe('good');
});
