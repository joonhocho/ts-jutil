import { allValues, promiseAll } from './allValues';

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
