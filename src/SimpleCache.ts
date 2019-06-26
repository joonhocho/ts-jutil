import { maybeRemoveFirst } from './array';
import { forEach } from './object';

export interface ISimpleCacheOptions<Value> {
  ttl?: number;
  maxSize?: number;
  initialStore?: IStore<Value>;
  initialKeys?: string[];
}

export interface IStore<Value> {
  [key: string]: Value;
}

export class SimpleCache<Value> {
  public ttl?: number;
  public maxSize?: number;
  public ttlIds: IStore<NodeJS.Timeout> = {};
  protected store: IStore<Value>;
  protected _keys: string[];

  constructor(opts?: ISimpleCacheOptions<Value>) {
    if (opts) {
      this.ttl = opts.ttl;
      this.maxSize = opts.maxSize;
      this.store = opts.initialStore ? { ...opts.initialStore } : {};
      this._keys = opts.initialKeys
        ? [...opts.initialKeys]
        : Object.keys(this.store);
    } else {
      this.store = {};
      this._keys = [];
    }
  }

  public get size(): number {
    return this._keys.length;
  }

  public get(key: string): Value | undefined {
    return this.store[key];
  }

  public has(key: string): boolean {
    return this.store.hasOwnProperty(key);
  }

  public set(key: string, value: Value, opts?: { ttl?: number }): void {
    const { store, ttlIds, _keys } = this;

    if (store.hasOwnProperty(key)) {
      // key already exists
      if (_keys[_keys.length - 1] !== key) {
        // move key to last
        maybeRemoveFirst(_keys, key);
        _keys.push(key);
      }
    } else {
      // is new key

      // move key to last
      maybeRemoveFirst(_keys, key);
      _keys.push(key);

      if (this.maxSize && _keys.length > this.maxSize) {
        // remove oldest key
        this.delete(_keys.shift()!);
      }
    }

    // set value
    store[key] = value;

    // clear previous ttl
    const tid = ttlIds[key];
    if (tid != null) {
      delete ttlIds[key];
      clearTimeout(tid);
    }

    // set new ttl
    let ttl = opts && opts.ttl;
    if (ttl == null) ttl = this.ttl;
    if (ttl != null) {
      ttlIds[key] = setTimeout(() => this.delete(key), ttl);
    }
  }

  public delete(key: string): void {
    // delete value
    delete this.store[key];

    // remove key
    maybeRemoveFirst(this._keys, key);

    // clear ttl
    const tid = this.ttlIds[key];
    if (tid != null) {
      delete this.ttlIds[key];
      clearTimeout(tid);
    }
  }

  public clear(): void {
    this.store = {};
    this._keys = [];
    forEach(this.ttlIds, (id) => clearTimeout(id));
    this.ttlIds = {};
  }

  public forEach(fn: (value: Value, key: string) => void): void {
    const { store, _keys } = this;
    for (let i = 0, len = _keys.length; i < len; i += 1) {
      const key = _keys[i];
      fn(store[key], key);
    }
  }

  public getKeys(): string[] {
    return this._keys.slice();
  }

  public getValues(): Value[] {
    return this._keys.map((key) => this.store[key]);
  }
}
