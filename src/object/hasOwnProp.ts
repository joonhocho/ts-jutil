export const { hasOwnProperty } = Object.prototype;

export const hasOwnProp = (o: any, k: keyof any): boolean =>
  typeof o.hasOwnProperty === 'function'
    ? o.hasOwnProperty(k)
    : hasOwnProperty.call(o, k);
