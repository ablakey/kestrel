import { DamageEffect } from "../Effects";
import {
  CombatBehaviour,
  Condition,
  Direction,
  MovementBehaviour,
  StrategyBehaviour,
  Thrust,
} from "../enum";
import { SpriteName } from "../Factories/SpriteFactory";
import { WeaponInstance } from "../Items";
import { Body } from "./Body";
import { Navigable } from "./Navigable";
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
  condition: Condition;
  effects: DamageEffect[];
  timeToLive: number | null;
};

export type Sprite = {
  kind: "Sprite";
  name: SpriteName;
  zIndex: number;
};

export type Player = {
  kind: "Player";
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

export type Component =
  | Ai
  | Body
  | Ammo
  | Engine
  | Health
  | Inventory
  | Kinematics
  | Offensive
  | Player
  | Politics
  | Sprite
  | Description
  | Navigable;
