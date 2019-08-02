export const noop = (): void => {
  /*noop*/
};
export const returnVoid = (): void => undefined;
export const returnNull = (): null => null;
export const returnTrue = (): true => true;
export const returnFalse = (): false => false;
export const bypass = <T>(v: T): T => v;

// tslint:disable-next-line typedef
export const getIsEqual = (x: any) => (y: any) => x === y;
