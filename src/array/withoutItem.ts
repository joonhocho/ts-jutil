export const withoutItem = <T>(arr: T[], item: T): T[] =>
  arr.filter((x) => x !== item);
