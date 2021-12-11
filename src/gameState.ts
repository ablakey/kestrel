import { Team } from "./enum";
import { DeepReadonly } from "./types";

export type Relations = Record<Team, Record<Team, number>>;

export type GameState = {
  showDebug: boolean;
  volume: number;
  isPaused: boolean;
  instanceRelations: Relations;
  globalRelations: Relations;
};

const initialRelations: Relations = {
  Player: { Independent: 20, Player: 100 },
  Independent: { Independent: 100, Player: 20 },
};

export const initialState: DeepReadonly<GameState> = {
  showDebug: false,
  isPaused: false,
  volume: 0,
  instanceRelations: initialRelations,
  globalRelations: initialRelations,
  // instanceRelations: these can change for a given starsystem instance. That way all ships of a class can respond.
  // Why doesn't every ship just follow the system relationship status?
  // - because independents don't band together
  // - Becuase upsetting one ship might not necessarily upset every ship of that team
};
