export const stringify = (
  obj: any,
  spacing = '  ',
  replacer: any = null
): string => JSON.stringify(obj, replacer, spacing);
