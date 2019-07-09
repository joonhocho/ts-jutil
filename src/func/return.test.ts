import {
  bypass,
  noop,
  returnFalse,
  returnNull,
  returnTrue,
  returnVoid,
} from './return';

test('noop', () => {
  expect(noop()).toBe(undefined);
  expect(noop()).toBe(undefined);
});

test('returnVoid', () => {
  expect(returnVoid()).toBe(undefined);
  expect(returnVoid()).toBe(undefined);
});

test('returnNull', () => {
  expect(returnNull()).toBe(null);
  expect(returnNull()).toBe(null);
});

test('returnTrue', () => {
  expect(returnTrue()).toBe(true);
  expect(returnTrue()).toBe(true);
});

test('returnFalse', () => {
  expect(returnFalse()).toBe(false);
  expect(returnFalse()).toBe(false);
});

test('bypass', () => {
  expect(bypass(undefined)).toBe(undefined);
  expect(bypass(null)).toBe(null);
  expect(bypass(true)).toBe(true);
  expect(bypass(1)).toBe(1);
  expect(bypass('')).toBe('');
});
