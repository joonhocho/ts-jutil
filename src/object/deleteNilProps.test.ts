import { deleteNilProps } from './deleteNilProps';

test('deleteNilProps', () => {
  const obj = {
    a: undefined,
    b: null,
    c: false,
    d: true,
    e: 0,
    f: 1,
    g: '',
    h: 'a',
    i: [],
    j: {},
    k: NaN,
  };
  expect(deleteNilProps(obj)).toEqual({
    c: false,
    d: true,
    e: 0,
    f: 1,
    g: '',
    h: 'a',
    i: [],
    j: {},
    k: NaN,
  });
  expect(obj).toEqual({
    c: false,
    d: true,
    e: 0,
    f: 1,
    g: '',
    h: 'a',
    i: [],
    j: {},
    k: NaN,
  });
});
