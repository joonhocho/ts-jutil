export const createBatcher = <A extends any[], R>(
  batch: (argsList: A[]) => Promise<R[]>,
  delay = 0
): ((...args: A) => Promise<R>) => {
  let argsQueue: A[] = [];
  let promise: Promise<R[]> | null = null;

  const queueAndWait = (args: A): Promise<R[]> => {
    argsQueue.push(args);

    if (!promise) {
      promise = new Promise((resolve, reject): void => {
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
      });
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
