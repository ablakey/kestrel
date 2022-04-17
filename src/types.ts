import { Politics } from "./Components";

export type ValueOf<T> = T[keyof T];

export type DeepReadonly<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> };

export type Relations = Record<Politics["team"], number>;
export type AllRelations = Record<Politics["team"], Relations>;

export type GameState = {
  showDebug: boolean;
  showAbout: boolean;
  volume: number;
  isPaused: boolean;
  instanceRelations: AllRelations;
  globalRelations: AllRelations;
};
