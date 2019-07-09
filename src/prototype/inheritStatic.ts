import { inheritProps } from './inheritProps';

const classStaticExclude: { [key: string]: 1 } = {
  length: 1,
  name: 1,
  arguments: 1,
  caller: 1,
  prototype: 1,
};

// tslint:disable-next-line typedef
export const inheritStatic = <T, F, E extends { [key: string]: 1 }>(
  to: T,
  from: F,
  excludeKeys?: E
) => inheritProps(to, from, { ...classStaticExclude, ...(excludeKeys as any) });
