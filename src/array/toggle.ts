export const toggle = <T>(arr: T[], item: T): void => {
  const index = arr.indexOf(item);
  if (index === -1) {
    arr.push(item);
  } else {
    arr.splice(index, 1);
  }
};
