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
  firePrimary: boolean;
  fireSecondary: boolean;
  bulletOffset: number;
  target: number | null; // ID of target it is tracking.
  // currentSecondaryWeapon
};

export type Navigation = {
  kind: "Navigation";
  target: number | null; // Component ID
};

export type Bullet = {
  kind: "Bullet";
  damage: number;
  target?: number; // ID of entity bullet is trying to hit (will collide with nothing else)
  turnRate?: number; // Some weapons will turn towards the target.
  // force: number;
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
  | Bullet
  | Engine
  | Health
  | Inventory
  | Kinematics
  | Offensive
  | Player
  | Politics
  | Sprite
  | Description
  | Navigable
  | Navigation;
