export type ValueListener<T> = (value: T, prevValue: T) => void;

export type Updater<T> = (v: T) => T;

export interface IListenerOptions {
  async?: boolean;
}

export class Value<T> {
  private fns: Array<ValueListener<T>> = [];
  private asyncFns: Array<ValueListener<T>> = [];
  private asyncQueued = false;

  constructor(protected _value: T) {}

  public on(fn: ValueListener<T>, opts?: IListenerOptions): () => boolean {
    (opts && opts.async ? this.asyncFns : this.fns).push(fn);
    return (): boolean => this.off(fn, opts);
  }

  public off(fn: ValueListener<T>, opts?: IListenerOptions): boolean {
    const fns = opts && opts.async ? this.asyncFns : this.fns;
    const i = fns.indexOf(fn);
    if (i >= 0) {
      fns.splice(i, 1);
      return true;
    }
    return false;
  }

  public get value(): T {
    return this._value;
  }

  public get(): T {
    return this._value;
  }

  public set(value: T | Updater<T>): void {
    const oldValue = this._value;
    const newValue =
      typeof value === 'function' ? (value as Updater<T>)(oldValue) : value;

    if (newValue !== oldValue) {
      this._value = newValue;
      const len = this.fns.length;
      if (len > 0) {
        for (let i = 0, fns = this.fns.slice(); i < len; i += 1) {
          fns[i](newValue, oldValue);
        }
      }

      if (!this.asyncQueued && this.asyncFns.length) {
        this.asyncQueued = true;
        setTimeout(() => {
          this.asyncQueued = false;
          const newValueAsync = this._value;
          if (newValueAsync !== oldValue) {
            for (
              let ai = 0, afns = this.asyncFns.slice(), alen = afns.length;
              ai < alen;
              ai += 1
            ) {
              afns[ai](newValueAsync, oldValue);
            }
          }
        }, 0);
      }
    }
  }

  public clear(): void {
    this.fns.length = this.asyncFns.length = 0;
  }
}
