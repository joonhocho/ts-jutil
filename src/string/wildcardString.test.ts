import { getWildcardStringMatcher } from './wildcardString';

test.only('getWildcardStringMatcher', () => {
  const run = (pattern: string, match: string, result: boolean): any =>
    expect(getWildcardStringMatcher(pattern)(match)).toBe(result);

  run('', '', true);
  run('', 'a', false);

  run('a', '', false);
  run('a', 'a', true);
  run('a', 'aa', false);
  run('aa', 'aa', true);

  run('?', '', false);
  run('?', 'a', true);
  run('?', '?', true);
  run('?', '*', false);
  run('?', 'a ', false);
  run('?', 'aa', false);
  run('??', 'a ', true);
  run('??', 'aa', true);
  run('??', 'a*', false);

  run('*', '', true);
  run('*', 'a', true);
  run('*', '?', true);
  run('*', '*', true);
  run('*', '**', true);
  run('*', '*a*', true);
  run('*', 'a ', true);
  run('*', 'aa', true);

  run('**', 'a ', true);
  run('**', 'aa', true);
  run('**', 'a*', true);

  run('*a*', 'a', true);
  run('*a*', '*', false);
  run('*a*', '**a', true);
  run('*a*', '**a**', true);
  run('*a*', '__a__', true);

  run('a*', 'a', true);
  run('a*', 'a_', true);
  run('a*', 'aa_', true);
  run('a*', ' aa_', false);

  run('*a', 'a', true);
  run('*a', 'ab', false);
  run('*a', 'ba', true);
  run('*a', 'aa', true);
  run('*a', 'aabaabaa', true);
  run('*a*a', 'aabaabaa', true);
  run('*a*a*', 'aabbaabbaabbaa', true);
  run('*a', 'bba', true);

  run('/a/b/c', '/a/b/c', true);
  run('/a/b/c', '/a/b/c/', false);
  run('/a/b/c/*', '/a/b/c/', true);
  run('/a/b/c', 'a/b/c', false);
  run('*/a/b/c', '/a/b/c', true);

  run('/a/*b/c', '/a/b/c', true);
  run('/a/*/b/c', '/a/b/c', false);
  run('/a/?/c', '/a/b/c', true);
  run(
    '/community/*/label/*/post/*/comment/*/vote',
    '/community//label/1/post/23/comment/456/vote',
    true
  );
  run(
    '/community/*/label/?/post/??/comment/???/vote',
    '/community//label/1/post/23/comment/456/vote',
    true
  );
  run('**?**', 'a', true);
  run('**?**', 'aa', true);
  run('**??**', 'a', false);
  run('**??**', 'aa', true);
  run('**??**', 'aaa', true);

  run('**??*?*???*', 'aaaaa', false);
  run('**??*?*???*', 'aaaaaa', true);
  run('**??*?*???*', 'aaaaaaa', true);
  run('**b?*?*???*', 'aaaaaaa', false);
  run('**a?*?*???*', 'aaaaaaa', true);
  run('**a?*a*aa?*', 'aaaaaaa', true);
  run('**a?aa*aa?*', 'aaaaaaa', true);
  run('**aaaa*aa?*', 'aaaaaaa', true);
  run('**aaaa*aaa*', 'aaaaaaa', true);
  run('**aa*aa*aaa*', 'aaaaaaa', true);
  run('**aaaaa*aaa*', 'aaaaaaa', false);
});
