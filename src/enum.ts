export enum Direction {
  None,
  Left,
  Right,
}

export enum Thrust {
  None,
  Forward,
}

export enum ShipBehaviour {
  Player,
  Aggressive,
}

export enum MovementBehaviour {
  None,
  PointAt,
  FlyThrough, // Fly straight through the nav target (eg. a missile)
  FlyTo, // Attempt to stop on the nav target.
}
