export const withTimeout = <T>(
  promise: Promise<T> | (() => Promise<T>),
  timeout: number
): Promise<T> =>
  new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('timeout')), timeout);

    try {
      if (typeof promise === 'function') {
        promise().then(resolve, reject);
      } else {
        promise.then(resolve, reject);
      }
    } catch (e) {
      reject(e);
    }
  });
