export const maybeRemoveFirst = <T>(arr: T[], item: T): number => {
  const index = arr.indexOf(item);
  if (index !== -1) {
    arr.splice(index, 1);
  }
  return index;
};
