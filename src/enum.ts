export enum Direction {
  None = "None",
  Left = "Left",
  Right = "Right",
}

export enum Thrust {
  None = "None",
  Forward = "Forward",
}

export enum MovementBehaviour {
  None = "None",
  PointAt = "PointAt",
  FlyThrough = "FlyThrough", // Fly straight through the nav target (eg. a missile)
  FlyTo = "FlyTo", // Attempt to stop on the nav target.
}

export enum StrategyBehaviour {
  None = "None",
  Attack = "Attack",
  Dock = "Dock",
  Board = "Board",
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
