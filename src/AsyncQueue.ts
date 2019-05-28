import { DeferredPromise } from './promise';

export type AsyncJob = () => void | Promise<void>;

export class AsyncQueue {
  private _running = false;
  private _queue: AsyncJob[] = [];

  private _promise: DeferredPromise<void> | null = null;

  constructor(public fifo = true) {}

  public add(job: AsyncJob): void {
    this._queue.push(job);
    this.run();
  }

  public remove(job: AsyncJob): number {
    const { _queue } = this;
    const i = _queue.indexOf(job);
    if (i >= 0) {
      _queue.splice(i, 1);
      return i;
    }
    return i;
  }

  public async run(): Promise<number> {
    let count = 0;
    if (!this._running) {
      this._running = true;
      const { _queue } = this;
      while (_queue.length > 0) {
        const job = this.fifo ? _queue.shift() : _queue.pop();
        await job!();
        count += 1;
      }
      this._running = false;
      if (this._promise) {
        this._promise.resolve();
        this._promise = null;
      }
    }
    return count;
  }

  public running(): boolean {
    return this._running;
  }

  public count(): number {
    return this._queue.length;
  }

  public async wait(): Promise<void> {
    if (this._running) {
      if (!this._promise) {
        this._promise = new DeferredPromise();
      }
      return this._promise.promise;
    }
  }
}
