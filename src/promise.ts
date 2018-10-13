export type PromiseOfNewType<T, U> = T extends Promise<any> ? Promise<U> : U;

export const sleep = (ms: number): Promise<void> =>
  new Promise(
    (resolve): void => {
      setTimeout(resolve, ms);
    }
  );

export const mapPromise = <V, MV>(
  data: V | Promise<V>,
  map: (v: V) => MV
): Promise<MV> | MV => {
  // Using PromiseOfNewType<T, U> as return type causes error. bug in Typescript
  if (data != null) {
    if (typeof (data as any).then === 'function') {
      return (data as Promise<V>).then(map) as any;
    }
  }
  return map(data as V) as any;
};

interface IDataResult<T> {
  data: T;
  error: null;
  resolved: true;
}

interface IErrorResult<T> {
  data: null;
  error: T;
  resolved: false;
}

type IResult<T, E> = IDataResult<T> | IErrorResult<E>;

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

export const waitAll = <T>(
  list: Array<Promise<T> | T>
): Promise<Array<IResult<T, any>>> => Promise.all(list.map(toResult));

export const createBatcher = <A extends any[], R>(
  batch: (argsList: A[]) => Promise<R[]>,
  delay = 0
): ((...args: A) => Promise<R>) => {
  let argsQueue: A[] = [];
  let promise: Promise<R[]> | null = null;

  const queueAndWait = (args: A): Promise<R[]> => {
    argsQueue.push(args);

    if (!promise) {
      promise = new Promise(
        (resolve, reject): void => {
          setTimeout((): void => {
            const argsList = argsQueue;
            argsQueue = [];
            promise = null;

            try {
              batch(argsList).then(resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, delay);
        }
      );
    }

    return promise;
  };

  return (...args: A): Promise<R> => {
    const index = argsQueue.length;
    return queueAndWait(args).then(
      (res) => res[index],
      (e) => {
        if (Array.isArray(e)) {
          throw e[index];
        }
        throw e;
      }
    );
  };
};

export type Unpromise<T> = T extends Promise<infer U> ? U : T;

export const allValues = <T extends { [key: string]: any }>(
  mapOfPromise: T
): Promise<{ [K in keyof T]: Unpromise<T[K]> }> => {
  const keys = Object.keys(mapOfPromise);
  const len = keys.length;
  const promises = new Array(len);
  for (let i = 0; i < len; i += 1) {
    promises[i] = mapOfPromise[keys[i]];
  }
  return Promise.all(promises).then((values) => {
    const mapped: { [K in keyof T]: Unpromise<T[K]> } = {} as any;
    for (let i = 0; i < len; i += 1) {
      mapped[keys[i]] = values[i];
    }
    return mapped;
  });
};

export const promiseAll = allValues;

export class DeferredPromise<T> {
  protected readonly _promise: Promise<T>;

  protected _resolve: ((value: T | PromiseLike<T>) => void) | null = null;
  protected _reject: ((reason?: any) => void) | null = null;

  private _fulfilled = false;

  constructor() {
    this._promise = new Promise<T>(
      (resolve, reject): void => {
        this._resolve = resolve;
        this._reject = reject;
      }
    );
  }

  public resolve(value: T | PromiseLike<T>): void {
    const { _resolve } = this;
    if (_resolve) {
      this._fulfilled = true;
      this._resolve = null;
      this._reject = null;
      _resolve(value);
    }
  }

  public reject(...args: any): void {
    const { _reject } = this;
    if (_reject) {
      this._resolve = null;
      this._reject = null;
      _reject(...args);
    }
  }

  get promise(): Promise<T> {
    return this._promise;
  }

  public get pending(): boolean {
    return Boolean(this._reject);
  }

  public get fulfilled(): boolean {
    return this._fulfilled;
  }

  public get rejected(): boolean {
    return !(this._fulfilled || this.pending);
  }

  public get status(): 'pending' | 'fulfilled' | 'rejected' {
    return this.pending ? 'pending' : this.fulfilled ? 'fulfilled' : 'rejected';
  }

  public then(...args: any): Promise<T> {
    return this._promise.then(...args);
  }

  public catch(...args: any): Promise<T> {
    return this._promise.catch(...args);
  }
}
