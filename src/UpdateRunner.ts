import { DeferredPromise } from './promise/DeferredPromise';

export type UpdateJob = () => void | Promise<void>;

export class UpdateRunner {
  private _running = false;
  private _queued = false;
  private _promise: DeferredPromise<void> | null = null;

  constructor(private job: UpdateJob) {}

  public queue(): void {
    if (this._running) {
      this._queued = true;
    } else {
      this.run();
    }
  }

  public queued(): boolean {
    return this._queued;
  }

  public running(): boolean {
    return this._running;
  }

  public async wait(): Promise<void> {
    if (this._running) {
      if (!this._promise) {
        this._promise = new DeferredPromise();
      }
      return this._promise.promise;
    }
  }

  private async run(): Promise<void> {
    this._queued = false;
    this._running = true;
    await this.job();
    this._running = false;
    if (this._queued) {
      this.run();
    } else if (this._promise) {
      this._promise.resolve();
      this._promise = null;
    }
  }
}
