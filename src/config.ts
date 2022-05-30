import { Size } from "./types/Ship";

export const MAP_ZOOM_LEVEL = 20;

export const MIN_SPEED = 5; // Any speed below this is considered stopped.

export const MIN_HIT_DISTANCE = 50; // Minimum distance where a collision is detected.

export const EXPLOSION_SPREAD = 40; // How much the explosions of a breaking up ship spread out.

export const MenuInputs = {
  Close: { key: "Escape" },
};

/**
 * The amount that a ship's size affects the impulses of explosives.
 * Ie. a larger ship will be displaced less by an explosion.
 */
export const InertiaFactors: Record<Size, number> = {
  Massive: 0.25,
  Large: 0.5,
  Normal: 1.0,
  Small: 2.0,
};

export const GameInputs = {
  // Movement.
  Thrust: { key: "ArrowUp" },
  RotateLeft: { key: "ArrowLeft" },
  RotateRight: { key: "ArrowRight" },
  RotateTowards: { key: "S" }, // Like autopilot, always point towards target.
  RotateOpposite: { key: "ArrowDown" },

  // Attack.
  FirePrimary: { key: "Space" },
  FireSecondary: { key: "ShiftLeft" },
  SelectSecondary: { key: "W", asEvent: true },

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
  Hud: 800,
};

// const initialRelations: AllRelations = {
//   Player: { Independent: 20, Player: 100, Rebellion: 0, Confederacy: 0 },
//   Independent: { Independent: 20, Player: 1, Rebellion: 50, Confederacy: 50 },
//   Rebellion: { Independent: -1, Player: 1, Rebellion: 100, Confederacy: -100 },
//   Confederacy: { Independent: 20, Player: 1, Rebellion: -100, Confederacy: 100 },
// };

// export const initialGameState: GameState = {
//   showDebug: false,
//   showAbout: false,
//   isPaused: false,
//   volume: 1, // 0 - 1
//   instanceRelations: initialRelations,
//   globalRelations: initialRelations,
//   // instanceRelations: these can change for a given starsystem instance. That way all ships of a class can respond.
//   // Why doesn't every ship just follow the system relationship status?
//   // - because independents don't band together
//   // - Becuase upsetting one ship might not necessarily upset every ship of that team
// };
