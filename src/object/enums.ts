interface IEnum {
  [key: string]: number;
}

export const enums = (list: string[], start = 1): IEnum => {
  const dest: IEnum = {};
  const len = list.length;
  for (let i = 0; i < len; i += 1) {
    dest[list[i]] = start + i;
  }
  return dest;
};
