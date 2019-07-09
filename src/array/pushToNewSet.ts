export const pushToNewSet = <T>(arr: T[], item: T): T[] => {
  if (arr.indexOf(item) === -1) {
    return arr.concat([item]);
  }
  return arr;
};
