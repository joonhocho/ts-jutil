export interface IDataResult<T> {
  data: T;
  error: null;
  resolved: true;
}

export interface IErrorResult<T> {
  data: null;
  error: T;
  resolved: false;
}

export type IResult<T, E> = IDataResult<T> | IErrorResult<E>;

const dataToResult = <T>(data: T): IDataResult<T> => ({
  data,
  error: null,
  resolved: true,
});

const errorToResult = <E>(error: E): IErrorResult<E> => ({
  data: null,
  error,
  resolved: false,
});

export const toResult = <T>(
  x: T | Promise<T>
): Promise<IResult<T, any>> | IResult<T, any> => {
  if (x != null) {
    if (typeof (x as any).then === 'function') {
      return (x as Promise<T>).then(dataToResult, errorToResult);
    }
    if (x instanceof Error) {
      return errorToResult(x);
    }
  }
  return dataToResult(x as T);
};
