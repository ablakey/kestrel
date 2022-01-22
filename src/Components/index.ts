import { BehaviourState } from "../Behaviours";
import { DamageEffect } from "../Effects";
import { SoundName } from "../Factories/SoundFactory";
import { SpriteName } from "../Factories/SpriteFactory";
import { WeaponName } from "../Inventory/Weapons";
import { Body } from "./Body";
import { Engine } from "./Engine";
import { Inventory } from "./Inventory";
import { Navigable } from "./Navigable";
import { Politics } from "./Politics";

export * from "./Body";
export * from "./Politics";

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
  target: number | null; // ID of entity bullet is trying to hit (will collide with nothing else)
  turnRate: number | null; // Some weapons will turn towards the target.
  hitSound: SoundName | null;
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
  condition: "Alive" | "Disabled" | "Destroying";
  effects: DamageEffect[];
  timeToLive: number | null;
};

export type Sprite = {
  kind: "Sprite";
  name: SpriteName;
  zIndex: number;
};

export type Ai = {
  kind: "Ai";
  combatAction: "Aggressive" | "Defensive" | "None";
  movementAction: "PointAt" | "FlyThrough" | "Stop" | "None";
  behaviour: BehaviourState;
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
  | Politics
  | Sprite
  | Description
  | Navigable
  | Navigation;
