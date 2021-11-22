import Victor from "victor";
import { DamageEffect } from "./Effects";
import { CombatBehaviour, Direction, MovementBehaviour, Team, Thrust } from "./enum";
import { WeaponName } from "./Items/Weapons";

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

export type Offensive = {
  kind: "Offensive";
  primaryFire: boolean;
  primaryCooldownUntil: number;
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
  texture: string;
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

export type AI = {
  kind: "AI";
  combatBehaviour: CombatBehaviour;
  movementBehaviour: MovementBehaviour;
};

export type Politics = {
  kind: "Politics";
  team: Team;
};

export type Component =
  | AI
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
  | Sprite;
