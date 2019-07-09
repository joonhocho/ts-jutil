import { parseFileUrl } from './parseFileUrl';

describe('parseFileUrl', () => {
  test('parse a uri into uri components', () => {
    const empty = {
      ext: '',
      hash: '',
      name: '',
      path: '',
      search: '',
    };
    expect(parseFileUrl(null as any)).toEqual(empty);
    expect(parseFileUrl('')).toEqual(empty);
    expect(parseFileUrl('/')).toEqual({
      ...empty,
      path: '/',
    });
    expect(parseFileUrl('/a')).toEqual({
      ...empty,
      name: 'a',
      path: '/',
    });
    expect(parseFileUrl('/a.jpg')).toEqual({
      ...empty,
      ext: '.jpg',
      name: 'a',
      path: '/',
    });
    expect(parseFileUrl('/a.jpg?b=1')).toEqual({
      ...empty,
      ext: '.jpg',
      name: 'a',
      path: '/',
      search: '?b=1',
    });
    expect(parseFileUrl('/a.jpg?b=1#hashtag')).toEqual({
      ...empty,
      ext: '.jpg',
      hash: '#hashtag',
      name: 'a',
      path: '/',
      search: '?b=1',
    });
    expect(parseFileUrl('/path/to/a.jpg?b=1#hashtag')).toEqual({
      ...empty,
      ext: '.jpg',
      hash: '#hashtag',
      name: 'a',
      path: '/path/to/',
      search: '?b=1',
    });
    expect(parseFileUrl('/path/to/?b=1#hashtag')).toEqual({
      ...empty,
      hash: '#hashtag',
      path: '/path/to/',
      search: '?b=1',
    });
    expect(parseFileUrl('/path/to/#ha?b=1#hashtag')).toEqual({
      ...empty,
      hash: '#ha?b=1#hashtag',
      path: '/path/to/',
    });
  });
});
