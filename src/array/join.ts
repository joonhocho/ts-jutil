export const join = <T, U>(arr: T[], sep: U): Array<T | U> => {
  const res: any[] = [];
  const len = arr.length;
  if (len !== 0) {
    res.push(arr[0]);
    for (let i = 1; i < len; i += 1) {
      res.push(sep, arr[i]);
    }
  }
  return res;
};
