import { countByIndex } from './countByIndex';

test('countByIndex', () => {
  expect(countByIndex([], 'id' as any)).toEqual({});

  expect(countByIndex(['a', 'b', 'c', 'a'])).toEqual({
    a: 2,
    b: 1,
    c: 1,
  });

  expect(countByIndex(['a', 'b', 'c', 'a'], null, { b: 3, d: 1 })).toEqual({
    a: 2,
    b: 4,
    c: 1,
    d: 1,
  });

  expect(countByIndex(['a', 'b', 'c', 'a'].map((k) => ({ k })), 'k')).toEqual({
    a: 2,
    b: 1,
    c: 1,
  });

  expect(
    countByIndex(['a', 'b', 'c', 'a'].map((k) => ({ k })), ({ k }) => k)
  ).toEqual({
    a: 2,
    b: 1,
    c: 1,
  });
});
