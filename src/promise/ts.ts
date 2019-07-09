export type PromiseOfNewType<T, U> = T extends Promise<any> ? Promise<U> : U;
