export const mapToUniqueString = <T>(
  arr: T[],
  fn: (item: T, index: number, array: T[]) => string | null | undefined
): string[] => {
  const idMap: { [key: string]: true } = {};
  const res: string[] = [];
  const len = arr.length;
  for (let i = 0; i < len; i += 1) {
    const id = fn(arr[i], i, arr);
    if (id != null && idMap[id] !== true) {
      idMap[id] = true;
      res.push(id);
    }
  }
  return res;
};
