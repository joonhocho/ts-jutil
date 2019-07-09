export const prependToNewSet = <T>(arr: T[], item: T): T[] => {
  if (arr.indexOf(item) === -1) {
    return [item].concat(arr);
  }
  return arr;
};
