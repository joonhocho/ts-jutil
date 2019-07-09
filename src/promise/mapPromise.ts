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
