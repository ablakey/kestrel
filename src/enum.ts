export enum Direction {
  None,
  Left,
  Right,
}

export enum Thrust {
  None,
  Forward,
}

export enum MovementBehaviour {
  None,
  PointAt,
  FlyThrough, // Fly straight through the nav target (eg. a missile)
  FlyTo, // Attempt to stop on the nav target.
}

export enum StrategyBehaviour {
  None,
  Attack,
  Dock,
  Board,
}

// TODO: we might need another Behaviour type that governs the overall movement + combat.  Behaviour trees?
export enum CombatBehaviour {
  None,
  Aggressive,
  Defensive,
}

export enum Team {
  Independent = "Independent",
  Player = "Player",
  Rebel = "Rebel",
  Confederacy = "Confederacy",
}
