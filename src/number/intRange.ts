export const intRange = (mini: number, maxi: number): number[] => {
  // tslint:disable-next-line prefer-array-literal
  const list = new Array(maxi - mini + 1);
  for (let i = mini; i <= maxi; i += 1) {
    list[i - mini] = i;
  }
  return list;
};
