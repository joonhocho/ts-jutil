import { deleteUndefinedProps } from './deleteUndefinedProps';

test('deleteUndefinedProps', () => {
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
  expect(deleteUndefinedProps(obj)).toEqual({
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
  });
  expect(obj).toEqual({
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
  });
});
