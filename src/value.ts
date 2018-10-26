export type ValueListener<T> = (value: T, prevValue: T | undefined) => void;

export class Value<T> {
  private fns: Array<ValueListener<T>> = [];

  constructor(protected _value?: T) {}

  public on(fn: ValueListener<T>): (() => boolean) {
    const { fns } = this;
    fns.push(fn);
    return (): boolean => this.off(fn);
  }

  public off(fn: ValueListener<T>): boolean {
    const { fns } = this;
    const i = fns.indexOf(fn);
    if (i >= 0) {
      fns.splice(i, 1);
      return true;
    }
    return false;
  }

  public get value(): T | undefined {
    return this._value;
  }

  public get(): T | undefined {
    return this._value;
  }

  public set(value: T): void {
    const { _value } = this;
    if (value !== _value) {
      this._value = value;
      const fns = this.fns.slice();
      const len = fns.length;
      for (let i = 0; i < len; i += 1) {
        fns[i](value, _value);
      }
    }
  }

  public clear(): void {
    this.fns.length = 0;
  }
}
