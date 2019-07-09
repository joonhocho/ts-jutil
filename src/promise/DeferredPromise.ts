export class TimeoutError extends Error {}

// tslint:disable-next-line max-classes-per-file
export class DeferredPromise<T, E = any> {
  protected readonly _promise: Promise<T>;
  protected _resolve: ((value: T | PromiseLike<T>) => void) | null = null;
  protected _reject: ((reason?: E | TimeoutError) => void) | null = null;
  protected _tid?: any; // number | NodeJS.Timer
  protected _fulfilled = false;

  constructor(protected timeout?: number) {
    this._promise = new Promise<T>((resolve, reject): void => {
      this._resolve = resolve;
      this._reject = reject;
    });
    if (timeout) {
      this._tid = setTimeout(() => {
        if (this._reject) {
          this.reject(new TimeoutError('timeout'));
        }
      }, timeout);
    }
  }

  public resolve(value: T | PromiseLike<T>): void {
    const { _resolve } = this;
    if (_resolve) {
      this._fulfilled = true;
      this.clear();
      _resolve(value);
    }
  }

  public reject(reason: E | TimeoutError): void {
    const { _reject } = this;
    if (_reject) {
      this.clear();
      _reject(reason);
    }
  }

  public then<T1 = T, T2 = never>(
    onFulfilled?: ((value: T) => T1 | PromiseLike<T1>) | undefined | null,
    onRejected?: ((reason: any) => T2 | PromiseLike<T2>) | undefined | null
  ): Promise<T1 | T2> {
    return this._promise.then(onFulfilled, onRejected);
  }

  public catch<T1 = never>(
    onRejected?: ((reason: any) => T1 | PromiseLike<T1>) | undefined | null
  ): Promise<T | T1> {
    return this._promise.catch(onRejected);
  }

  private clear(): void {
    this._resolve = null;
    this._reject = null;
    const { _tid } = this;
    if (_tid) {
      clearTimeout(_tid);
      this._tid = undefined;
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
}
