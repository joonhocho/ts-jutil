import { withoutUndefinedProps } from './withoutUndefinedProps';

test('withoutUndefinedProps', () => {
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
  expect(withoutUndefinedProps(obj)).toEqual({
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
  });
});
