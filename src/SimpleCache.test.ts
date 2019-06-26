import { SimpleCache } from './SimpleCache';

test('SimpleCache', async () => {
  const cache = new SimpleCache({
    ttl: 10,
    maxSize: 3,
    initialStore: { a: 1, b: 2 },
    initialKeys: ['b', 'a'],
  });

  expect(cache.size).toBe(2);

  expect(cache.get('a')).toBe(1);
  expect(cache.get('b')).toBe(2);
  expect(cache.get('c')).toBe(undefined);

  expect(cache.has('a')).toBe(true);
  expect(cache.has('b')).toBe(true);
  expect(cache.has('c')).toBe(false);

  const mockFn = jest.fn();
  cache.forEach(mockFn);
  expect(mockFn.mock.calls).toEqual([[2, 'b'], [1, 'a']]);
  mockFn.mockClear();

  expect(cache.getKeys()).toEqual(['b', 'a']);
  expect(cache.getValues()).toEqual([2, 1]);

  cache.set('c', 3);

  expect(cache.size).toBe(3);
  expect(cache.get('c')).toBe(3);
  expect(cache.has('c')).toBe(true);

  cache.forEach(mockFn);
  expect(mockFn.mock.calls).toEqual([[2, 'b'], [1, 'a'], [3, 'c']]);
  mockFn.mockClear();

  cache.set('c', 3.3);

  expect(cache.size).toBe(3);
  expect(cache.get('c')).toBe(3.3);
  expect(cache.has('c')).toBe(true);

  cache.forEach(mockFn);
  expect(mockFn.mock.calls).toEqual([[2, 'b'], [1, 'a'], [3.3, 'c']]);
  mockFn.mockClear();

  cache.set('a', 1.1);

  expect(cache.size).toBe(3);
  expect(cache.get('a')).toBe(1.1);
  expect(cache.has('a')).toBe(true);

  cache.forEach(mockFn);
  expect(mockFn.mock.calls).toEqual([[2, 'b'], [3.3, 'c'], [1.1, 'a']]);
  mockFn.mockClear();

  // test LRU
  cache.set('d', 4);

  expect(cache.size).toBe(3);
  expect(cache.get('d')).toBe(4);
  expect(cache.has('d')).toBe(true);

  cache.forEach(mockFn);
  expect(mockFn.mock.calls).toEqual([[3.3, 'c'], [1.1, 'a'], [4, 'd']]);
  mockFn.mockClear();

  cache.delete('c');

  expect(cache.size).toBe(2);
  expect(cache.get('c')).toBe(undefined);
  expect(cache.has('c')).toBe(false);

  cache.forEach(mockFn);
  expect(mockFn.mock.calls).toEqual([[1.1, 'a'], [4, 'd']]);
  mockFn.mockClear();

  cache.clear();

  expect(cache.size).toBe(0);
  expect(cache.get('a')).toBe(undefined);
  expect(cache.get('b')).toBe(undefined);
  expect(cache.get('c')).toBe(undefined);

  expect(cache.has('a')).toBe(false);
  expect(cache.has('b')).toBe(false);
  expect(cache.has('c')).toBe(false);

  cache.forEach(mockFn);
  expect(mockFn.mock.calls).toEqual([]);
  mockFn.mockClear();
});
