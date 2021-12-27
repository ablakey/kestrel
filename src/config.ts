import { AllRelations, DeepReadonly, GameState } from "./types";

export const MAP_ZOOM_LEVEL = 20;

export const MenuInputs = {
  Close: { key: "Escape" },
};

export const GameInputs = {
  // Movement.
  Thrust: { key: "W" },
  RotateLeft: { key: "A" },
  RotateRight: { key: "D" },

  // Attack.
  FirePrimary: { key: "Space" },
  FireSecondary: { key: "MetaLeft" },

  // Targeting.
  NextTarget: { key: "Tab", asEvent: true },
  // PreviousTarget: { key: "ShiftTab", asEvent: true },

  // UI
  ShowDebug: { key: "O", asEvent: true },
  showAbout: { key: "I", asEvent: true },
} as const;

export const ZIndexes = {
  Planet: 300,
  Ship: 400,
  Bullet: 500,
  Player: 600,
  Explosion: 700,
};

const initialRelations: AllRelations = {
  Player: { Independent: 20, Player: 100, Rebellion: 0, Confederacy: 0 },
  Independent: { Independent: 20, Player: -1, Rebellion: 50, Confederacy: 50 },
  Rebellion: { Independent: 20, Player: -1, Rebellion: 100, Confederacy: -100 },
  Confederacy: { Independent: 20, Player: -1, Rebellion: -100, Confederacy: 100 },
};

export const initialGameState: DeepReadonly<GameState> = {
  showDebug: false,
  showAbout: false,
  isPaused: false,
  volume: 1, // 0 - 1
  instanceRelations: initialRelations,
  globalRelations: initialRelations,
  // instanceRelations: these can change for a given starsystem instance. That way all ships of a class can respond.
  // Why doesn't every ship just follow the system relationship status?
  // - because independents don't band together
  // - Becuase upsetting one ship might not necessarily upset every ship of that team
};
