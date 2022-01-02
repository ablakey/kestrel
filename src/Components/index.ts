import { DamageEffect } from "../Effects";
import { CombatBehaviour, Condition, MovementBehaviour, StrategyBehaviour } from "../enum";
import { SpriteName } from "../Factories/SpriteFactory";
import { AmmosInstance, WeaponInstance } from "../Items";
import { WeaponName } from "../Items/Weapons";
import { Body } from "./Body";
import { Engine } from "./Engine";
import { Navigable } from "./Navigable";
import { Politics } from "./Politics";

export * from "./Body";
export * from "./Politics";

export type Inventory = {
  kind: "Inventory";
  weapons: WeaponInstance[];
  ammos: AmmosInstance[];
};

export type Offensive = {
  kind: "Offensive";
  firePrimary: boolean;
  fireSecondary: boolean;
  bulletOffset: number;
  target: number | null; // ID of target it is tracking.
  selectedSecondary: WeaponName | null;
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
