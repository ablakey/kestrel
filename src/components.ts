import Victor from "victor";
import { DamageEffect } from "./Effects";
import { CombatBehaviour, Direction, MovementBehaviour, Team, Thrust } from "./enum";
import { WeaponInstance } from "./Items";
import { SpriteName } from "./resources";

export interface Body {
  kind: "Body";
  position: Victor;
  velocity: Victor;
  yaw: Victor;
  angularVelocity: number; // radians per second
}

export class Body {
  /**
   * Get the angle in radians between a source and a target.
   * This is how far the source has to rotate to point at the target.  The sign (positive or negative)
   * describes which way to turn to shrink the delta.
   *
   * From: https://math.stackexchange.com/questions/110080/shortest-way-to-achieve-target-angle
   */
  public static getDeltaAngle(src: Body, target: Body) {
    const targetAngle = src.position.clone().subtract(target.position).norm().angle() - Math.PI;
    return ((targetAngle - src.yaw.angle() + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
  }

  /**
   * Given a source, target, and tolerance (to prevent constant jittering), return which direction (or
   * None) to turn towards.
   */
  public static getTurnDirection(src: Body, target: Body, tolerance: number): Direction {
    const angle = Body.getDeltaAngle(src, target);
    if (Math.abs(angle) < tolerance) {
      return Direction.None;
    }

    return angle > 0 ? Direction.Left : Direction.Right;
  }

  /**
   * Return if a is facing b, within a tolerance in radians.
   * TODO: clean this up. Probably a better way to do it with vectors?
   */
  public static isFacing(a: Body, b: Body, tolerance: number): boolean {
    const isFacing = Math.abs(Body.getDeltaAngle(a, b)) < tolerance;
    return isFacing;
  }
}

export type Engine = {
  kind: "Engine";
  direction: Direction;
  thrust: Thrust;
};

export type Inventory = {
  kind: "Inventory";
  weapons: WeaponInstance[];
};

export type Offensive = {
  kind: "Offensive";
  primaryFire: boolean;
  bulletOffset: number;
  target: number | null; // Component ID
  // currentSecondaryWeapon
};

export type Damage = {
  kind: "Damage";
  damage: number;
  // damage type
  //
};

export type Kinematics = {
  kind: "Kinematics";
  maxSpeed: number;
  acceleration: number;
  turnRate: number;
};

export type Health = {
  kind: "Health";
  hp: number;
  effects: DamageEffect[];
};

export type Sprite = {
  kind: "Sprite";
  sprite: SpriteName;
  offsetX: number;
  offsetY: number;
};

export type Player = {
  kind: "Player";
};

export type Navigation = {
  kind: "Navigation";
  goal: Victor | null;
};

export type Ai = {
  kind: "Ai";
  combatBehaviour: CombatBehaviour;
  movementBehaviour: MovementBehaviour;
};

export type Politics = {
  kind: "Politics";
  team: Team;
};

export type Description = {
  kind: "Description";
  label: string;
};

export type Exploding = {
  kind: "Exploding";
  start: number;
};

export type Component =
  | Ai
  | Body
  | Damage
  | Engine
  | Health
  | Inventory
  | Kinematics
  | Navigation
  | Offensive
  | Player
  | Politics
  | Sprite
  | Description
  | Exploding;
