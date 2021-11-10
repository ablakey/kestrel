import Victor from "victor";
import { DamageEffect } from "./Effects";
import { Direction, Thrust } from "./enum";

// export type Sprite   <- need to start associating sprites with entities.

export type Body = {
  kind: "Body";
  pos: Victor;
  yaw: number;
  vel: Victor;
};

export type Engine = {
  kind: "Engine";
  direction: Direction;
  thrust: Thrust;
};

/**
 * An entity with Offensive is able to fire weapons.
 */
export type Offensive = {
  kind: "Offensive";
  primaryFire: boolean;
  primaryCooldownUntil: number;
  bulletOffset: number;
  // currentSecondaryWeapon
};

/**
 * An entity with Damage will do a type of damage to something it hits.
 * This is likely just bullets: missiles, rockets, bombs, beams, etc.  But it could be longer
 * lived things like asteroids, mines, maybe ships.
 */
export type Damage = {
  kind: "Damage";
  damage: number;
  // damage type
  //
};

export type Stats = {
  kind: "Stats";
  health: number;
  damageEffects: DamageEffect[];
};

export type Sprite = {
  kind: "Sprite";
  texture: string;
};

export type Component = Body | Engine | Offensive | Stats | Sprite | Damage;
