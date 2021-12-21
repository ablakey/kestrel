import { Team } from "./enum";
import { DeepReadonly } from "./types";

export type Relations = Record<Team, number>;
export type AllRelations = Record<Team, Relations>;

export type GameState = {
  showDebug: boolean;
  volume: number;
  isPaused: boolean;
  instanceRelations: AllRelations;
  globalRelations: AllRelations;
};

const initialRelations: AllRelations = {
  Player: { Independent: 20, Player: 100, Rebellion: 0, Confederacy: 0 },
  Independent: { Independent: 20, Player: -1, Rebellion: 50, Confederacy: 50 },
  Rebellion: { Independent: 20, Player: -1, Rebellion: 100, Confederacy: -100 },
  Confederacy: { Independent: 20, Player: -1, Rebellion: -100, Confederacy: 100 },
};

export const initialState: DeepReadonly<GameState> = {
  showDebug: false,
  isPaused: false,
  volume: 1, // 0 - 1
  instanceRelations: initialRelations,
  globalRelations: initialRelations,
  // instanceRelations: these can change for a given starsystem instance. That way all ships of a class can respond.
  // Why doesn't every ship just follow the system relationship status?
  // - because independents don't band together
  // - Becuase upsetting one ship might not necessarily upset every ship of that team
};
