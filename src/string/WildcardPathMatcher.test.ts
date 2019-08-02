import {
  createWildcardStringMatcher,
  WildcardPathMatcher,
} from './WildcardPathMatcher';

test('WildcardPathMatcher', () => {
  const matcher = new WildcardPathMatcher(['a', '**', 'b', '*', 'c']);
  expect(matcher.match(['a', 'b', 'xx', 'c'])).toBe(true);
  expect(matcher.match(['a', 'b', 'c'])).toBe(false);
  expect(matcher.match(['a', 'xx', 'b', 'xx', 'c'])).toBe(true);
  expect(matcher.match(['a', 'xx', 'xx', 'b', 'c', 'c'])).toBe(true);
  expect(matcher.match(['a', 'xx', 'xx', 'b', 'xx', 'c'])).toBe(true);
  expect(matcher.match(['xx', 'xx', 'b', 'xx', 'c'])).toBe(false);
  expect(matcher.match(['a', 'xx', 'c'])).toBe(false);
  expect(matcher.match(['a', 'b', 'c'])).toBe(false);
  expect(matcher.match(['a', 'b', 'xx', 'c'])).toBe(true);
  expect(matcher.match(['a', 'b', 'xx', 'xx', 'c'])).toBe(false);
  expect(matcher.match(['a', 'b', 'xx', 'c', 'd'])).toBe(false);
  expect(matcher.match(['a', 'b', 'c', 'c'])).toBe(true);
  expect(matcher.match(['a', 'b', 'b', 'c'])).toBe(true);
  expect(matcher.match(['a', 'b', 'b', 'b', 'b', 'c'])).toBe(true);
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

  run('/a/a/*/a/a', '/a/a/a/a', false);
  run('/a/a/*/a/a', '/a/a/a/a/a', true);
  run('/a/a/*/a/a', '/a/a/a/a/a/a', false);

  run('/a/a/**/a/a', '/a/a/a', false);
  run('/a/a/**/a/a', '/a/a/a/a', true);
  run('/a/a/**/a/a', '/a/a/a/a/a', true);
  run('/a/a/**/a/a', '/a/a/a/a/a/a', true);

  run('/a/a/*?/a/a', '/a/a/a', false);
  run('/a/a/*?/a/a', '/a/a/a/a', true);
  run('/a/a/*?/a/a', '/a/a/a/a/a', true);
  run('/a/a/*?/a/a', '/a/a/a/a/a/a', false);

  run('/a/a/*+/a/a', '/a/a/a', false);
  run('/a/a/*+/a/a', '/a/a/a/a', false);
  run('/a/a/*+/a/a', '/a/a/a/a/a', true);
  run('/a/a/*+/a/a', '/a/a/a/a/a/a', true);

  run('/a/*/c', '/a/b/c', true);
  run('/a/*/c', '/a/*/c', true);
  run('/a/*/c', '/a/**/c', false);
  run('/a/*/c', '/a/*?/c', false);
  run('/a/*/c', '/a/*+/c', false);

  run('/a/*?/c', '/a/b/c', true);
  run('/a/*?/c', '/a/*/c', true);
  // run('/a/*?/c', '/a/**/c', false);
  // run('/a/*?/c', '/a/*?/c', true);
  // run('/a/*?/c', '/a/*+/c', false);

  // run('/a/*+/c', '/a/b/c', true);
  // run('/a/*+/c', '/a/*/c', true);
  // run('/a/*+/c', '/a/**/c', false);
  // run('/a/*+/c', '/a/*?/c', false);
  // run('/a/*+/c', '/a/*+/c', true);

  // run('/a/**/c', '/a/b/c', true);
  // run('/a/**/c', '/a/*/c', true);
  // run('/a/**/c', '/a/**/c', true);
  // run('/a/**/c', '/a/*?/c', true);
  // run('/a/**/c', '/a/*+/c', true);

  expect(() => createWildcardStringMatcher('/a/**/a/**/a')).toThrowError(
    'once'
  );
});
