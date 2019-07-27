import { withoutNilProps } from './withoutNilProps';

test('withoutNilProps', () => {
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
  expect(withoutNilProps(obj)).toEqual({
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
