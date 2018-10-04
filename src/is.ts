export const isUndefined = (x: any): x is undefined => x === undefined;

export const isDefined = (x: any): boolean => x !== undefined;

export const isNull = (x: any): x is null => x === null;

export const isNotNull = (x: any): boolean => x !== null;

export const isNil = (x: any): boolean => x == null;

export const isNotNil = (x: any): boolean => x != null;

export const isTruthy = (x: any): boolean => (x ? true : false);

export const isFalsy = (x: any): boolean => !x;

export const isBoolean = (x: any): x is boolean => typeof x === 'boolean';

export const isNotBoolean = (x: any): boolean => typeof x !== 'boolean';

export const isNumber = (x: any): x is number => typeof x === 'number';

export const isNotNumber = (x: any): boolean => typeof x !== 'number';

export const isString = (x: any): x is string => typeof x === 'string';

export const isNotString = (x: any): boolean => typeof x !== 'string';

// tslint:disable-next-line ban-types
export const isFunction = (x: any): x is Function => typeof x === 'function';

export const isNotFunction = (x: any): boolean => typeof x !== 'function';
