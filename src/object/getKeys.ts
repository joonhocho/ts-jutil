export const getKeys: <T>(
  obj: T
) => Array<string & keyof T> = Object.keys as any;

export { getKeys as keys };
