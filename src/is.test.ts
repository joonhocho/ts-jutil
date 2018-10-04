import {
  isBoolean,
  isDefined,
  isFalsy,
  isFunction,
  isNil,
  isNotBoolean,
  isNotFunction,
  isNotNil,
  isNotNull,
  isNotNumber,
  isNotString,
  isNull,
  isNumber,
  isString,
  isTruthy,
  isUndefined,
} from './is';

test('isDefined', () => {
  expect(isDefined('')).toBe(true);
  expect(isDefined('a')).toBe(true);
  expect(isDefined((i: any) => i)).toBe(true);
  expect(isDefined(/a/)).toBe(true);
  expect(isDefined(0)).toBe(true);
  expect(isDefined(1)).toBe(true);
  expect(isDefined(Infinity)).toBe(true);
  expect(isDefined(NaN)).toBe(true);
  expect(isDefined([1])).toBe(true);
  expect(isDefined([])).toBe(true);
  expect(isDefined(false)).toBe(true);
  expect(isDefined(new Date())).toBe(true);
  expect(isDefined(null)).toBe(true);
  expect(isDefined(true)).toBe(true);
  expect(isDefined(undefined)).toBe(false);
  expect(isDefined({ a: 1 })).toBe(true);
  expect(isDefined({})).toBe(true);
});

test('isUndefined', () => {
  expect(isUndefined('')).toBe(false);
  expect(isUndefined('a')).toBe(false);
  expect(isUndefined((i: any) => i)).toBe(false);
  expect(isUndefined(/a/)).toBe(false);
  expect(isUndefined(0)).toBe(false);
  expect(isUndefined(1)).toBe(false);
  expect(isUndefined(Infinity)).toBe(false);
  expect(isUndefined(NaN)).toBe(false);
  expect(isUndefined([1])).toBe(false);
  expect(isUndefined([])).toBe(false);
  expect(isUndefined(false)).toBe(false);
  expect(isUndefined(new Date())).toBe(false);
  expect(isUndefined(null)).toBe(false);
  expect(isUndefined(true)).toBe(false);
  expect(isUndefined(undefined)).toBe(true);
  expect(isUndefined({ a: 1 })).toBe(false);
  expect(isUndefined({})).toBe(false);
});

test('isNotNil', () => {
  expect(isNotNil('')).toBe(true);
  expect(isNotNil('a')).toBe(true);
  expect(isNotNil((i: any) => i)).toBe(true);
  expect(isNotNil(/a/)).toBe(true);
  expect(isNotNil(0)).toBe(true);
  expect(isNotNil(1)).toBe(true);
  expect(isNotNil(Infinity)).toBe(true);
  expect(isNotNil(NaN)).toBe(true);
  expect(isNotNil([1])).toBe(true);
  expect(isNotNil([])).toBe(true);
  expect(isNotNil(false)).toBe(true);
  expect(isNotNil(new Date())).toBe(true);
  expect(isNotNil(null)).toBe(false);
  expect(isNotNil(true)).toBe(true);
  expect(isNotNil(undefined)).toBe(false);
  expect(isNotNil({ a: 1 })).toBe(true);
  expect(isNotNil({})).toBe(true);
});

test('isNil', () => {
  expect(isNil('')).toBe(false);
  expect(isNil('a')).toBe(false);
  expect(isNil((i: any) => i)).toBe(false);
  expect(isNil(/a/)).toBe(false);
  expect(isNil(0)).toBe(false);
  expect(isNil(1)).toBe(false);
  expect(isNil(Infinity)).toBe(false);
  expect(isNil(NaN)).toBe(false);
  expect(isNil([1])).toBe(false);
  expect(isNil([])).toBe(false);
  expect(isNil(false)).toBe(false);
  expect(isNil(new Date())).toBe(false);
  expect(isNil(null)).toBe(true);
  expect(isNil(true)).toBe(false);
  expect(isNil(undefined)).toBe(true);
  expect(isNil({ a: 1 })).toBe(false);
  expect(isNil({})).toBe(false);
});

test('isNotNull', () => {
  expect(isNotNull('')).toBe(true);
  expect(isNotNull('a')).toBe(true);
  expect(isNotNull((i: any) => i)).toBe(true);
  expect(isNotNull(/a/)).toBe(true);
  expect(isNotNull(0)).toBe(true);
  expect(isNotNull(1)).toBe(true);
  expect(isNotNull(Infinity)).toBe(true);
  expect(isNotNull(NaN)).toBe(true);
  expect(isNotNull([1])).toBe(true);
  expect(isNotNull([])).toBe(true);
  expect(isNotNull(false)).toBe(true);
  expect(isNotNull(new Date())).toBe(true);
  expect(isNotNull(null)).toBe(false);
  expect(isNotNull(true)).toBe(true);
  expect(isNotNull(undefined)).toBe(true);
  expect(isNotNull({ a: 1 })).toBe(true);
  expect(isNotNull({})).toBe(true);
});

test('isNull', () => {
  expect(isNull('')).toBe(false);
  expect(isNull('a')).toBe(false);
  expect(isNull((i: any) => i)).toBe(false);
  expect(isNull(/a/)).toBe(false);
  expect(isNull(0)).toBe(false);
  expect(isNull(1)).toBe(false);
  expect(isNull(Infinity)).toBe(false);
  expect(isNull(NaN)).toBe(false);
  expect(isNull([1])).toBe(false);
  expect(isNull([])).toBe(false);
  expect(isNull(false)).toBe(false);
  expect(isNull(new Date())).toBe(false);
  expect(isNull(null)).toBe(true);
  expect(isNull(true)).toBe(false);
  expect(isNull(undefined)).toBe(false);
  expect(isNull({ a: 1 })).toBe(false);
  expect(isNull({})).toBe(false);
});

test('isTruthy', () => {
  expect(isTruthy('')).toBe(false);
  expect(isTruthy('a')).toBe(true);
  expect(isTruthy((i: any) => i)).toBe(true);
  expect(isTruthy(/a/)).toBe(true);
  expect(isTruthy(0)).toBe(false);
  expect(isTruthy(1)).toBe(true);
  expect(isTruthy(Infinity)).toBe(true);
  expect(isTruthy(NaN)).toBe(false);
  expect(isTruthy([1])).toBe(true);
  expect(isTruthy([])).toBe(true);
  expect(isTruthy(false)).toBe(false);
  expect(isTruthy(new Date())).toBe(true);
  expect(isTruthy(null)).toBe(false);
  expect(isTruthy(true)).toBe(true);
  expect(isTruthy(undefined)).toBe(false);
  expect(isTruthy({ a: 1 })).toBe(true);
  expect(isTruthy({})).toBe(true);
});

test('isFalsy', () => {
  expect(isFalsy('')).toBe(true);
  expect(isFalsy('a')).toBe(false);
  expect(isFalsy((i: any) => i)).toBe(false);
  expect(isFalsy(/a/)).toBe(false);
  expect(isFalsy(0)).toBe(true);
  expect(isFalsy(1)).toBe(false);
  expect(isFalsy(Infinity)).toBe(false);
  expect(isFalsy(NaN)).toBe(true);
  expect(isFalsy([1])).toBe(false);
  expect(isFalsy([])).toBe(false);
  expect(isFalsy(false)).toBe(true);
  expect(isFalsy(new Date())).toBe(false);
  expect(isFalsy(null)).toBe(true);
  expect(isFalsy(true)).toBe(false);
  expect(isFalsy(undefined)).toBe(true);
  expect(isFalsy({ a: 1 })).toBe(false);
  expect(isFalsy({})).toBe(false);
});

test('isBoolean', () => {
  expect(isBoolean('')).toBe(false);
  expect(isBoolean('a')).toBe(false);
  expect(isBoolean((i: any) => i)).toBe(false);
  expect(isBoolean(/a/)).toBe(false);
  expect(isBoolean(0)).toBe(false);
  expect(isBoolean(1)).toBe(false);
  expect(isBoolean(Infinity)).toBe(false);
  expect(isBoolean(NaN)).toBe(false);
  expect(isBoolean([1])).toBe(false);
  expect(isBoolean([])).toBe(false);
  expect(isBoolean(false)).toBe(true);
  expect(isBoolean(new Date())).toBe(false);
  expect(isBoolean(null)).toBe(false);
  expect(isBoolean(true)).toBe(true);
  expect(isBoolean(undefined)).toBe(false);
  expect(isBoolean({ a: 1 })).toBe(false);
  expect(isBoolean({})).toBe(false);
});

test('isNotBoolean', () => {
  expect(isNotBoolean('')).toBe(true);
  expect(isNotBoolean('a')).toBe(true);
  expect(isNotBoolean((i: any) => i)).toBe(true);
  expect(isNotBoolean(/a/)).toBe(true);
  expect(isNotBoolean(0)).toBe(true);
  expect(isNotBoolean(1)).toBe(true);
  expect(isNotBoolean(Infinity)).toBe(true);
  expect(isNotBoolean(NaN)).toBe(true);
  expect(isNotBoolean([1])).toBe(true);
  expect(isNotBoolean([])).toBe(true);
  expect(isNotBoolean(false)).toBe(false);
  expect(isNotBoolean(new Date())).toBe(true);
  expect(isNotBoolean(null)).toBe(true);
  expect(isNotBoolean(true)).toBe(false);
  expect(isNotBoolean(undefined)).toBe(true);
  expect(isNotBoolean({ a: 1 })).toBe(true);
  expect(isNotBoolean({})).toBe(true);
});

test('isNumber', () => {
  expect(isNumber('')).toBe(false);
  expect(isNumber('a')).toBe(false);
  expect(isNumber((i: any) => i)).toBe(false);
  expect(isNumber(/a/)).toBe(false);
  expect(isNumber(0)).toBe(true);
  expect(isNumber(1)).toBe(true);
  expect(isNumber(Infinity)).toBe(true);
  expect(isNumber(NaN)).toBe(true);
  expect(isNumber([1])).toBe(false);
  expect(isNumber([])).toBe(false);
  expect(isNumber(false)).toBe(false);
  expect(isNumber(new Date())).toBe(false);
  expect(isNumber(null)).toBe(false);
  expect(isNumber(true)).toBe(false);
  expect(isNumber(undefined)).toBe(false);
  expect(isNumber({ a: 1 })).toBe(false);
  expect(isNumber({})).toBe(false);
});

test('isNotNumber', () => {
  expect(isNotNumber('')).toBe(true);
  expect(isNotNumber('a')).toBe(true);
  expect(isNotNumber((i: any) => i)).toBe(true);
  expect(isNotNumber(/a/)).toBe(true);
  expect(isNotNumber(0)).toBe(false);
  expect(isNotNumber(1)).toBe(false);
  expect(isNotNumber(Infinity)).toBe(false);
  expect(isNotNumber(NaN)).toBe(false);
  expect(isNotNumber([1])).toBe(true);
  expect(isNotNumber([])).toBe(true);
  expect(isNotNumber(false)).toBe(true);
  expect(isNotNumber(new Date())).toBe(true);
  expect(isNotNumber(null)).toBe(true);
  expect(isNotNumber(true)).toBe(true);
  expect(isNotNumber(undefined)).toBe(true);
  expect(isNotNumber({ a: 1 })).toBe(true);
  expect(isNotNumber({})).toBe(true);
});

test('isString', () => {
  expect(isString('')).toBe(true);
  expect(isString('a')).toBe(true);
  expect(isString((i: any) => i)).toBe(false);
  expect(isString(/a/)).toBe(false);
  expect(isString(0)).toBe(false);
  expect(isString(1)).toBe(false);
  expect(isString(Infinity)).toBe(false);
  expect(isString(NaN)).toBe(false);
  expect(isString([1])).toBe(false);
  expect(isString([])).toBe(false);
  expect(isString(false)).toBe(false);
  expect(isString(new Date())).toBe(false);
  expect(isString(null)).toBe(false);
  expect(isString(true)).toBe(false);
  expect(isString(undefined)).toBe(false);
  expect(isString({ a: 1 })).toBe(false);
  expect(isString({})).toBe(false);
});

test('isNotString', () => {
  expect(isNotString('')).toBe(false);
  expect(isNotString('a')).toBe(false);
  expect(isNotString((i: any) => i)).toBe(true);
  expect(isNotString(/a/)).toBe(true);
  expect(isNotString(0)).toBe(true);
  expect(isNotString(1)).toBe(true);
  expect(isNotString(Infinity)).toBe(true);
  expect(isNotString(NaN)).toBe(true);
  expect(isNotString([1])).toBe(true);
  expect(isNotString([])).toBe(true);
  expect(isNotString(false)).toBe(true);
  expect(isNotString(new Date())).toBe(true);
  expect(isNotString(null)).toBe(true);
  expect(isNotString(true)).toBe(true);
  expect(isNotString(undefined)).toBe(true);
  expect(isNotString({ a: 1 })).toBe(true);
  expect(isNotString({})).toBe(true);
});

test('isFunction', () => {
  expect(isFunction('')).toBe(false);
  expect(isFunction('a')).toBe(false);
  expect(isFunction((i: any) => i)).toBe(true);
  expect(isFunction(/a/)).toBe(false);
  expect(isFunction(0)).toBe(false);
  expect(isFunction(1)).toBe(false);
  expect(isFunction(Infinity)).toBe(false);
  expect(isFunction(NaN)).toBe(false);
  expect(isFunction([1])).toBe(false);
  expect(isFunction([])).toBe(false);
  expect(isFunction(false)).toBe(false);
  expect(isFunction(new Date())).toBe(false);
  expect(isFunction(null)).toBe(false);
  expect(isFunction(true)).toBe(false);
  expect(isFunction(undefined)).toBe(false);
  expect(isFunction({ a: 1 })).toBe(false);
  expect(isFunction({})).toBe(false);
});

test('isNotFunction', () => {
  expect(isNotFunction('')).toBe(true);
  expect(isNotFunction('a')).toBe(true);
  expect(isNotFunction((i: any) => i)).toBe(false);
  expect(isNotFunction(/a/)).toBe(true);
  expect(isNotFunction(0)).toBe(true);
  expect(isNotFunction(1)).toBe(true);
  expect(isNotFunction(Infinity)).toBe(true);
  expect(isNotFunction(NaN)).toBe(true);
  expect(isNotFunction([1])).toBe(true);
  expect(isNotFunction([])).toBe(true);
  expect(isNotFunction(false)).toBe(true);
  expect(isNotFunction(new Date())).toBe(true);
  expect(isNotFunction(null)).toBe(true);
  expect(isNotFunction(true)).toBe(true);
  expect(isNotFunction(undefined)).toBe(true);
  expect(isNotFunction({ a: 1 })).toBe(true);
  expect(isNotFunction({})).toBe(true);
});
