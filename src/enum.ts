export enum Direction {
  None,
  Left,
  Right,
}

export enum Thrust {
  None,
  Forward,
}

// TODO: CombatBehaviour: Aggressive, Defensive, Passive, Fleeing,

export enum MovementBehaviour {
  None,
  PointAt,
  FlyThrough, // Fly straight through the nav target (eg. a missile)
  FlyTo, // Attempt to stop on the nav target.
}

export enum Team {
  Independent,
  Player,
}
