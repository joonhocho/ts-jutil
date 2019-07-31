import {
  createWildcardMatcher,
  createWildcardStringMatcher,
} from './createWildcardMatcher';

test('createWildcardMatcher', () => {
  const matcher = createWildcardMatcher(['a', '**', 'b', '*', 'c']);
  expect(matcher(['a', 'b', 'xx', 'c'])).toBe(true);
  expect(matcher(['a', 'b', 'c'])).toBe(false);
  expect(matcher(['a', 'xx', 'b', 'xx', 'c'])).toBe(true);
  expect(matcher(['a', 'xx', 'xx', 'b', 'c', 'c'])).toBe(true);
  expect(matcher(['a', 'xx', 'xx', 'b', 'xx', 'c'])).toBe(true);
  expect(matcher(['xx', 'xx', 'b', 'xx', 'c'])).toBe(false);
  expect(matcher(['a', 'xx', 'c'])).toBe(false);
  expect(matcher(['a', 'b', 'c'])).toBe(false);
  expect(matcher(['a', 'b', 'xx', 'c'])).toBe(true);
  expect(matcher(['a', 'b', 'xx', 'xx', 'c'])).toBe(false);
  expect(matcher(['a', 'b', 'xx', 'c', 'd'])).toBe(false);
  expect(matcher(['a', 'b', 'c', 'c'])).toBe(true);
  expect(matcher(['a', 'b', 'b', 'c'])).toBe(true);
  expect(matcher(['a', 'b', 'b', 'b', 'b', 'c'])).toBe(true);
});

test('createWildcardStringMatcher', () => {
  const run = (pattern: string, match: string, result: boolean): any =>
    expect(createWildcardStringMatcher(pattern)(match)).toBe(result);

  run('/a/b/c', '/a/b/c', true);
  run('/a/b/c', '/a/b/c/', false);
  run('/a/b/c/*', '/a/b/c/', true);
  run('/a/b/c', 'a/b/c', false);
  run('*/a/b/c', '/a/b/c', true);

  run('/a/*?/b/c', '/a/b/c', true);
  run('/a/*?/b/c', '/a/x/b/c', true);
  run('/a/*?/b/c', '/a/x/xx/b/c', false);

  run('/a/**/b/c', '/a/b/c', true);
  run('/a/**/b/c', '/a/x/b/c', true);
  run('/a/**/b/c', '/a/x/xx/b/c', true);

  run('/a/*+/b/c', '/a/b/c', false);
  run('/a/*+/b/c', '/a/xx/b/c', true);
  run('/a/*+/b/c', '/a/xx/xx/xx/b/c', true);

  run('**/a/b/c', '/a/b/c', true);
  run('**/a/b/c', 'a/b/c', true);
  run('**/a/b/c', 'a/b/c/', false);

  run('/a/b/c/**', '/a/b/c/', true);
  run('/a/b/c/**', '/a/b/c', true);
  run('/a/b/c/**', 'a/b/c', false);
});
