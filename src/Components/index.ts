import Victor from "victor";
import { DamageEffect } from "../Effects";
import { CombatBehaviour, Direction, MovementBehaviour, StrategyBehaviour, Thrust } from "../enum";
import { WeaponInstance } from "../Items";
import { SpriteName } from "../resources";
import { Body } from "./Body";
import { Politics } from "./Politics";

export * from "./Body";
export * from "./Politics";

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

export type Ammo = {
  kind: "Ammo";
  damage: number;
  // force: number;
  trackable: boolean;
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
  strategy: StrategyBehaviour;
  combatBehaviour: CombatBehaviour;
  movementBehaviour: MovementBehaviour;
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
  | Ammo
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
