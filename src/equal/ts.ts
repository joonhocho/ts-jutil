export interface IEqualValuesOptions {
  normalize?: (a: any) => any;
  equalValues?: (a: any, b: any, opts: IEqualValuesOptions) => boolean;
}

export type IEqualOptions = IEqualValuesOptions & {
  keys?: string[] | number[];
  skipKeys?: string[] | number[];
  testKeys: boolean;
  allowSubset?: boolean;
};
