import Victor from "victor";
import { Direction, Thrust } from "./enum";
import { WeaponFactory } from "./factories/WeaponFactory";
import { DamageEffect } from "./structures/Effects";
import { Weapon, WeaponName } from "./structures/Weapons";

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

export type Armament = {
  kind: "Armament";
  primaryFire: boolean;
  primaryCooldownUntil: number;
  primaryWeapons: Record<WeaponName, Weapon>;
  currentWeapon: WeaponName | null;
};

/**
 * A weapon will create entities with a damage component.
 */
export type Damage = {
  kind: "Damage";
  amount: number;
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

export type Component = Body | Engine | Armament | Bullet | Stats | Sprite;
