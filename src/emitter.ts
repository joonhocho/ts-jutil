export class Emitter<T, R = void> {
  private fns: Array<(data: T) => R> = [];

  public on(fn: (data: T) => R): () => boolean {
    const { fns } = this;
    fns.push(fn);
    return (): boolean => this.off(fn);
  }

  public off(fn: (data: T) => R): boolean {
    const { fns } = this;
    const i = fns.indexOf(fn);
    if (i >= 0) {
      fns.splice(i, 1);
      return true;
    }
    return false;
  }

  public emit(data: T): void {
    const fns = this.fns.slice();
    const len = fns.length;
    for (let i = 0; i < len; i += 1) {
      fns[i](data);
    }
  }

  public emitGet(data: T): R[] {
    return this.fns.slice().map((fn) => fn(data));
  }

  public clear(): void {
    this.fns.length = 0;
  }
}
