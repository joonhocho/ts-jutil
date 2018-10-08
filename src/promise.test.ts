import { last } from './array';
import {
  allValues,
  createBatcher,
  DeferredPromise,
  mapPromise,
  promiseAll,
  sleep,
  waitAll,
} from './promise';

// tslint:disable-next-line typedef
const promiseLike = (v: any) => ({
  // tslint:disable-next-line typedef
  then: (x: any) => Promise.resolve(x(v)),
});

test('sleep', async () => {
  const t = Date.now();
  await sleep(150);
  expect(Date.now() - t).toBeGreaterThanOrEqual(150);
});

test('mapPromise', async () => {
  expect(mapPromise(1, String)).toBe('1');
  expect(mapPromise(null, String)).toBe('null');
  expect(mapPromise(undefined, String)).toBe('undefined');
  expect(mapPromise([1], last)).toBe(1);
  expect(await mapPromise(Promise.resolve(null), String)).toBe('null');
  expect(await mapPromise(promiseLike(null), String)).toBe('null');
});

describe('promise', () => {
  describe('waitAll', () => {
    test('waits for all promises including rejected ones.', async () => {
      const [r1, r2, r3, r4, r5] = await waitAll([
        undefined,
        null,
        1,
        Promise.resolve(2),
        Promise.reject(3),
      ] as any);

      expect(r1).toEqual({
        data: undefined,
        error: null,
        resolved: true,
      });

      expect(r2).toEqual({
        data: null,
        error: null,
        resolved: true,
      });

      expect(r3).toEqual({
        data: 1,
        error: null,
        resolved: true,
      });

      expect(r4).toEqual({
        data: 2,
        error: null,
        resolved: true,
      });

      expect(r5).toEqual({
        data: null,
        error: 3,
        resolved: false,
      });
    });
  });
});

describe('createBatcher', () => {
  test('batch simple math operation', async () => {
    const times2 = createBatcher((argsList) =>
      Promise.resolve(argsList.map(([v]: any) => v * 2))
    );

    expect(
      await Promise.all([times2(1), times2(2), times2(3), times2(4), times2(5)])
    ).toEqual([2, 4, 6, 8, 10]);

    expect(await Promise.all([times2(3), times2(6), times2(9)])).toEqual([
      6,
      12,
      18,
    ]);
  });

  const shouldNotBeHere = (): never => {
    throw new Error('should not be here');
  };

  test('throws error', async () => {
    const batcher = createBatcher((args) => {
      throw args.map(([v]) => v);
    });

    const p1 = batcher(1).then(shouldNotBeHere, (e) => {
      expect(e).toBe(1);
      return 2;
    });
    const p2 = batcher(3).then(shouldNotBeHere, (e) => {
      expect(e).toBe(3);
      return 4;
    });

    expect(await Promise.all([p1, p2])).toEqual([2, 4]);
  });

  test('throws error', async () => {
    const batcher = createBatcher(() => {
      throw new Error('same error');
    });

    const p1 = batcher(1).then(shouldNotBeHere, (e) => {
      expect(e.message).toBe('same error');
      return 2;
    });
    const p2 = batcher(3).then(shouldNotBeHere, (e) => {
      expect(e.message).toBe('same error');
      return 4;
    });

    expect(await Promise.all([p1, p2])).toEqual([2, 4]);
  });
});

test('allValues', async () => {
  expect(
    await allValues({
      a: undefined,
      b: null,
      c: 1,
      d: Promise.resolve(4),
      e: Promise.resolve(Promise.resolve({ f: 'g' })).then((x) =>
        Promise.resolve(Promise.resolve(x))
      ),
    })
  ).toEqual({
    a: undefined,
    b: null,
    c: 1,
    d: 4,
    e: { f: 'g' },
  });

  promiseAll({
    a: undefined,
    b: null,
    c: 1,
    d: Promise.resolve(4),
    e: Promise.resolve({ f: 'g' }),
    f: Promise.reject(new Error('eee')),
  }).then(
    () => {
      throw new Error('should not be here');
    },
    (e) => {
      expect(e.message).toBe('eee');
    }
  );
});

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
});
