export const pushToSet = <T>(arr: T[], item: T): boolean => {
  if (arr.indexOf(item) === -1) {
    arr.push(item);
    return true;
  }
  return false;
};
