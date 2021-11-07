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

export type Combat = {
  kind: "Combat";
  primaryFire: boolean;
  primaryCooldownUntil: number;
  // currentSecondaryWeapon
};

export type Damage = {
  kind: "Damage";
  damage: number;
  // damage type
  //
};

export type ShortLived = {
  kind: "ShortLived";
  lifespan: number;
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

export type Component = Body | Engine | Combat | Stats | Sprite | Damage | ShortLived;
