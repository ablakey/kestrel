export type ValueOf<T> = T[keyof T];

export type DeepReadonly<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> };
