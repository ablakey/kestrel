import { Team } from "./enum";

export type ValueOf<T> = T[keyof T];

export type DeepReadonly<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> };

export type Relations = Record<Team, number>;
export type AllRelations = Record<Team, Relations>;

export type GameState = {
  showDebug: boolean;
  showAbout: boolean;
  volume: number;
  isPaused: boolean;
  instanceRelations: AllRelations;
  globalRelations: AllRelations;
};
