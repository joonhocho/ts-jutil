export type ListenerType<T, R> = (data: T, acc: R | null) => R;
export type OffFunction = () => boolean;

export class Emitter<T, R = void> {
  private _fns: Array<ListenerType<T, R>> = [];

  public on(fn: ListenerType<T, R>): OffFunction {
    this._fns.push(fn);
    return (): boolean => this.off(fn);
  }

  public prepend(fn: ListenerType<T, R>): OffFunction {
    this._fns.unshift(fn);
    return (): boolean => this.off(fn);
  }

  public once(fn: ListenerType<T, R>): OffFunction {
    let off: OffFunction | null = this.on((data, acc) => {
      const r = fn(data, acc);
      if (off) {
        off();
        off = null;
      }
      return r;
    });
    return off;
  }

  public off(fn: ListenerType<T, R>): boolean {
    const { _fns } = this;
    const i = _fns.indexOf(fn);
    if (i >= 0) {
      _fns.splice(i, 1);
      return true;
    }
    return false;
  }

  public emit(data: T): R | null {
    const fns = this._fns.slice();
    const len = fns.length;
    let acc: R | null = null;
    for (let i = 0; i < len; i += 1) {
      acc = fns[i](data, acc);
    }
    return acc;
  }

  public emitGet(data: T): R[] {
    let acc: R | null = null;
    return this._fns.slice().map((fn) => (acc = fn(data, acc)));
  }

  public count(): number {
    return this._fns.length;
  }

  public clear(): void {
    this._fns.length = 0;
  }
}
