import Victor from "victor";
import { DamageEffect } from "./Effects";
import { Direction, Thrust } from "./enum";
import { Weapon, WeaponName } from "./Items/Weapons";

// export type Sprite   <- need to start associating sprites with entities.

export type Body = {
  kind: "Body";
  position: Victor;
  velocity: Victor;
  yaw: Victor;
  angularVelocity: number; // radians per second
};

export type Engine = {
  kind: "Engine";
  direction: Direction;
  thrust: Thrust;
};

export type Inventory = {
  kind: "Inventory";
  weapons: { name: WeaponName }[]; // TODO: cooldownUntil, etc.
};

/**
 * An entity with Offensive is able to fire weapons.
 */
export type Offensive = {
  kind: "Offensive";
  primaryFire: boolean;
  primaryCooldownUntil: number;
  bulletOffset: number;
  target: number | null; // Component ID
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
  texture: string;
};

export type Player = {
  kind: "Player";
};

export type Navigation = {
  kind: "Navigation";
  goal: Victor | null;
};

export type Component =
  | Body
  | Engine
  | Offensive
  | Health
  | Sprite
  | Damage
  | Player
  | Kinematics
  | Navigation
  | Inventory;
